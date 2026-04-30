function NewList({ handleSubmit }: { handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void }) {
  return (
    <form method="post" action="/api/list/create" onSubmit={handleSubmit}>
      <label htmlFor="newListTitle">
        <p>Add a new list:</p>
        <input id="newListTitle" type="text" placeholder="List title" required />
      </label>
      <button type="submit">Save</button>
    </form>
  )
}

export default NewList;