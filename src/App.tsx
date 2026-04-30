import { useState, useEffect } from 'react';
import List, { type ListProps } from './components/List';
import NewList from './components/NewList';

import './App.css';

function App() {
  const [lists, setLists] = useState<ListProps[]>([]);

  useEffect(() => {
    fetch("/api/lists")
      .then((res) => res.json())
      .then((data) => setLists(data))
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('/api/list/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.target.newListTitle.value
      })
    })
      .then(res => res.json())
      .then(data => {
        // TODO something here
        console.log('inside handlesubmit', data);
      })
      .catch(err => console.log(err));
  }


  return (
    <>
      {lists && <div>
        <h1>To Do List</h1>
        <ul className="listWrapper">
          {lists.map((list) => (
            <List key={list._id} {...list} />
          ))}
        </ul>
      </div>}
      <NewList handleSubmit={handleSubmit}></NewList>
    </>
  );
}

export default App;