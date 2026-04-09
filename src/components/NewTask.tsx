function NewTask({ handleSubmit }: { handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void }) {
  return (
    <form method="post" action="/api/task/create" onSubmit={handleSubmit}>
      <label htmlFor="newTaskTitle">
        Add a new task
        <input id="newTaskTitle" type="text" placeholder="Task title" required />
      </label>
      <button type="submit">Save</button>
    </form>
  )
}

export default NewTask;