import { useState, useEffect } from 'react';
import List, { type ListProps } from './components/List';
import NewList from './components/NewList';

import './App.css';

function App() {
  const [lists, setLists] = useState<ListProps[]>([]);

  useEffect(() => {
    fetch('/api/lists')
      .then((res) => res.json())
      .then((lists) => setLists(lists))
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmitNewList(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await fetch('/api/list/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.target.newListTitle.value,
      }),
    })
      .then((res) => res.json())
      .then((list) => {
        setLists([...lists, list]);
        event.target.newListTitle.value = '';
      })
      .catch((err) => console.log(err));
  }

  async function onDeleteList(listId: string) {
    await fetch('/api/list/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: listId,
      }),
    })
      .then(() => {
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listId),
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {lists && (
        <div>
          <h1>To Do List</h1>
          <ul className="listWrapper">
            {lists.map((list) => (
              <List
                key={list._id}
                {...list}
                onDeleteList={() => onDeleteList(list._id)}
              />
            ))}
          </ul>
        </div>
      )}
      <NewList handleSubmitNewList={handleSubmitNewList}></NewList>
    </>
  );
}

export default App;
