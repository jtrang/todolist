import express from 'express';
import { connectDb } from './utils/db';
import { TaskModel } from "./models/Task.ts";
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
    const taskTitle = req.body?.title || 'New Task';
    const task = await TaskModel.create({ title: taskTitle });
    res.json(task);
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

export default app;