import { useState } from 'react';
import './NewTask.css';

function NewTask({
  handleSubmitNewTask,
}: {
  handleSubmitNewTask: (title: string) => void;
}) {
  const [title, setTitle] = useState<string>('');

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitNewTask(title);
    setTitle('');
  };

  return (
    <form method="post" action="/api/task/create" onSubmit={onSubmit}>
      <label htmlFor="newTaskTitle">
        <p>Add a new task:</p>
        <input
          id="newTaskTitle"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default NewTask;
