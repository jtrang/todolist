import { useState } from 'react';

function NewList({
  handleSubmitNewList,
}: {
  handleSubmitNewList: (title: string) => void;
}) {
  const [title, setTitle] = useState<string>('');

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitNewList(title);
    setTitle('');
  };

  return (
    <form method="post" action="/api/list/create" onSubmit={onSubmit}>
      <label htmlFor="newListTitle">
        <p>Add a new list:</p>
        <input
          id="newListTitle"
          type="text"
          placeholder="List title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default NewList;
