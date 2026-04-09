import { useState, useEffect } from 'react';
import List, { type ListProps } from './components/List';
import './App.css';

function App() {
  const [lists, setLists] = useState<ListProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/lists")
      .then((res) => res.json())
      .then((data) => setLists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    lists && <div>
      <h1>To Do List</h1>
      <ul className="listWrapper">
        {lists.map((list) => (
          <List key={list._id} {...list} />
        ))}
      </ul>
    </div>
  );
}

export default App;