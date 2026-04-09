import { useState } from "react";
import TaskCard, { type TaskProps } from "./TaskCard";
import NewTask from './NewTask';
import "./List.css";

export interface ListProps {
  _id: string;
  title: string;
  tasks: TaskProps[];
}

export function List({ _id, title, tasks }: ListProps) {
  const [listTasks, setListTasks] = useState<TaskProps[]>(tasks);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('http://localhost:3000/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        title: event.target.newTaskTitle.value
      })
    })
      .then(res => res.json())
      .then(data => {
        setListTasks(data.tasks)
        event.target.newTaskTitle.value = '';
      })
      .catch(err => console.log(err));
  }

  async function onCheckTask(taskId: string, isComplete: boolean) {
    await fetch('http://localhost:3000/api/task/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
        isComplete,
      })
    })
      .then(() => {
        setListTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, isComplete } : task
          )
        );
      })
      .catch(err => console.log(err));
  }

  return (
    <div key={_id}>
      <h2>{title}</h2>

      <ul className="list">
        {listTasks && listTasks.map((task) => (
          <TaskCard key={task._id} {...task} onCheckTask={(e) => onCheckTask(task._id, e.target.checked)} />
        ))}
      </ul>

      <NewTask handleSubmit={(event) => handleSubmit(event)} />
    </div>
  );
}

export default List;