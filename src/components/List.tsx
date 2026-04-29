import { useState, useRef, useEffect } from "react";
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard, { type TaskProps } from "./Task";
import NewTask from './NewTask';
import "./List.css";

export interface ListProps {
  _id: string;
  title: string;
  tasks: TaskProps[];
}

export function List({ _id, title, tasks }: ListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [listTasks, setListTasks] = useState<TaskProps[]>(tasks);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);
  // TODO: rename function to reflect action
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

  async function onDeleteTask(taskId: string) {
    await fetch('http://localhost:3000/api/task/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
      })
    }).then(() => {
      setListTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId))
    }).catch(err => console.log(err));
  }

  return (
    <div key={_id} ref={ref} className={isDraggedOver ? 'highlight' : ''}>
      <h2>{title}</h2>

      <ul className="list">
        {listTasks && listTasks.map((task) => (
          <TaskCard
            key={task._id}
            {...task}
            onCheckTask={(e) => onCheckTask(task._id, e.target.checked)}
            onDeleteTask={() => onDeleteTask(task._id)} />
        ))}
        <NewTask handleSubmit={handleSubmit} />
      </ul>
    </div>
  );
}

export default List;