import { useState, useEffect } from 'react';
// import type { IList } from './models/List';
import List, { type ListProps } from './components/List';

function App() {
  const [lists, setLists] = useState<ListProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/lists")
      .then((res) => res.json())
      .then((data) => setLists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>To Do List</h1>

      <ul>
        {lists.map((list) => (
          <List key={list._id} {...list} />
        ))}
      </ul>
    </div>
  );
}

export default App;