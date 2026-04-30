import { useState, useEffect } from 'react';
import List, { type ListProps } from './components/List';
import NewList from './components/NewList';
import { getAllLists, createList } from './services/listService.js';
import './App.css';

function App() {
  const [lists, setLists] = useState<ListProps[]>([]);

  useEffect(() => {
    async function loadAllLists() {
      try {
        const allLists = await getAllLists();
        setLists(allLists);
      } catch (err) {
        console.log(err);
        alert(`Failed to load all lists. Error message: ${err}`);
      }
    }

    loadAllLists();
  }, []);

  async function handleSubmitNewList(title: string) {
    try {
      const list = await createList(title);
      setLists([...lists, list]);
    } catch (err) {
      alert(`Failed to create list. Please try again. ${err}`);
    }
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
