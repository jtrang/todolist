import { useState, useEffect } from 'react';
import type { ITask } from './models/Task';
import List from "./components/List";

interface IFrontendList {
  _id: string;
  title: string;
  tasks: ITask[];
}

function App() {
  const [lists, setLists] = useState<IFrontendList[]>([]);

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
          <List key={String(list._id)} title={list.title} tasks={list.tasks} />
        ))}
      </ul>
    </div>
  );
}

export default App;