import './NewTask.css';

function NewTask({
  handleSubmitNewTask,
}: {
  handleSubmitNewTask: (event: React.SubmitEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      method="post"
      action="/api/task/create"
      onSubmit={handleSubmitNewTask}
    >
      <label htmlFor="newTaskTitle">
        <p>Add a new task:</p>
        <input
          id="newTaskTitle"
          type="text"
          placeholder="Task title"
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default NewTask;
