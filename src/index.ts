import express from 'express';
import { connectDb } from './utils/db';
import { TaskModel } from "./models/Task.ts";
import type { ITask } from './models/Task.ts';
import { ListModel } from "./models/List.ts";
import util from 'util';

connectDb();

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

app.post('/api/task/create', async (req, res) => {
  console.log('api/task/create');
  try {
    const listId = req.body?._id;
    const taskTitle = req.body?.title;

    if (!listId) {
      return res.status(400).json({ error: 'List ID is required' });
    }
    if (!taskTitle) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const task = await TaskModel.create({ title: taskTitle });
    const list = await ListModel.findOneAndUpdate(
      { _id: listId },
      { $push: { tasks: task._id } },
      { returnDocument: 'after' }
    ).populate<{ tasks: ITask[] }>('tasks');

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.post('/api/list/create', async (req, res) => {
  console.log('api/list/create');
  try {
    const listTitle = req.body?.title || 'New List';
    const list = await ListModel.create({ title: listTitle });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

app.get('/api/tasks', async (req, res) => {
  console.log('api/tasks');
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

app.get('/api/lists', async (req, res) => {
  console.log('api/lists');
  try {
    const lists = await ListModel.find().populate<{ tasks: ITask[] }>('tasks');
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get lists' });
  }
});

export default app;