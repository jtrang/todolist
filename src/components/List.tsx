import { useState, useRef, useEffect } from 'react';
import { createTask } from '../services/taskService.js';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard, { type TaskProps } from './Task';
import NewTask from './NewTask';
import './List.css';

export interface ListProps {
  _id: string;
  title: string;
  tasks: TaskProps[];
  onDeleteList: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function List({ _id, title, tasks, onDeleteList }: ListProps) {
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

  async function handleSubmitNewTask(title: string) {
    try {
      const list = await createTask(_id, title);
      setListTasks(list.tasks);
    } catch (err) {
      alert(`Failed to create task. Please try again. Error message: ${err}`);
    }
  }

  async function onCheckTask(taskId: string, isComplete: boolean) {
    await fetch('/api/task/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
        isComplete,
      }),
    })
      .then(() => {
        setListTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, isComplete } : task,
          ),
        );
      })
      .catch((err) => console.log(err));
  }

  async function onDeleteTask(taskId: string) {
    await fetch('/api/task/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: taskId,
      }),
    })
      .then(() => {
        setListTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId),
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div key={_id} ref={ref} className={isDraggedOver ? 'highlight' : ''}>
      <h2>{title}</h2>
      <button onClick={onDeleteList}>Delete</button>

      <ul className="list">
        {listTasks &&
          listTasks.map((task) => (
            <TaskCard
              key={task._id}
              {...task}
              onCheckTask={(e) => onCheckTask(task._id, e.target.checked)}
              onDeleteTask={() => onDeleteTask(task._id)}
            />
          ))}
        <NewTask handleSubmitNewTask={handleSubmitNewTask} />
      </ul>
    </div>
  );
}

export default List;
