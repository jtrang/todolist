import app from './index.js';
import { test, before, after, beforeEach, describe, mock } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ListModel } from './models/List.js';

let mongoServer: MongoMemoryServer;

// Start the in-memory database before all tests
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Close connection and stop server after all tests
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear database collections between individual tests
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe('List API Endpoints', () => {
  describe('POST /api/list/create', () => {
    test('should create a new and empty list', async () => {
      const listTitle = 'Test List';
      const response = await request(app)
        .post('/api/list/create')
        .send({ listTitle });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.title, listTitle);
      assert.deepStrictEqual(response.body.tasks, []);
    });

    test('should throw 400 Bad Request if list title is absent', async () => {
      const response = await request(app).post('/api/list/create').send({});

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.error, 'List title is required');
    });

    test('should throw 400 Bad Request if list title is an empty string or whitespace', async () => {
      const response = await request(app)
        .post('/api/list/create')
        .send({ listTitle: '   ' });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.error, 'List title is required');
    });

    test('should throw 400 Bad Request if list title is an unexpected data type', async () => {
      const response = await request(app)
        .post('/api/list/create')
        .send({ listTitle: 12345 });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.error, 'List title is required');
    });

    test('should throw 500 Internal Server Error if database fails', async () => {
      mock.method(ListModel, 'create', async () => {
        throw new Error('Fake DB Error');
      });

      const response = await request(app)
        .post('/api/list/create')
        .send({ listTitle: 'Valid Title' });

      assert.strictEqual(response.status, 500);
      assert.strictEqual(response.body.error, 'Failed to create list');

      mock.restoreAll();
    });
  });

  describe('GET /api/lists', () => {
    test('should return all lists', async () => {
      await ListModel.create({ title: 'My Fake List' });

      const response = await request(app).get('/api/lists');

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.length, 1);
      assert.strictEqual(response.body[0].title, 'My Fake List');
    });
  });

  describe('Integration Tests', () => {
    test('creating a list via POST makes it available via GET', async () => {
      const postResponse = await request(app)
        .post('/api/list/create')
        .send({ listTitle: 'Integration Test List' });

      assert.strictEqual(postResponse.status, 200);

      const getResponse = await request(app).get('/api/lists');

      assert.strictEqual(getResponse.status, 200);
      assert.strictEqual(getResponse.body.length, 1);
      assert.strictEqual(getResponse.body[0].title, 'Integration Test List');
      assert.strictEqual(getResponse.body[0]._id, postResponse.body._id);
    });
  });
});
