import express from 'express';
import { connectDb } from './utils/db';
import { TaskModel } from "./models/Task.ts";
import type { ITask } from './models/Task.ts';
import { ListModel } from "./models/List.ts";

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

app.post('/api/task/status', async (req, res) => {
  console.log('api/task/status');
  try {
    const taskId = req.body?._id;
    const status = req.body?.isComplete;

    if (!req.body?._id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    if (typeof status !== 'boolean') {
      return res.status(400).json({ error: 'isComplete must be a boolean' });
    }

    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      { isComplete: status },
      { returnDocument: 'after' }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

app.delete('/api/task/delete', async (req, res) => {
  console.log('api/task/delete', req.body);
  try {
    const task = await TaskModel.findByIdAndDelete(req.body?._id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).send(`Task with id ${task._id} deleted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
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

app.get('/api/tasks', async (_, res) => {
  console.log('api/tasks');
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

app.get('/api/lists', async (_, res) => {
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