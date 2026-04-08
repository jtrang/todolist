import TaskCard from "./TaskCard";
import "./List.css";
import type { ITask } from '../models/Task';

function List({ key, title, tasks }: { key: string, title: string, tasks: ITask[] }) {
  return (
    <div key={key}>
      <h2>{title}</h2>

      <ul className="list">
        {tasks.map((task) => (
          <TaskCard key={String(task._id)} title={task.title} isComplete={task.isComplete} />
        ))}
      </ul>
    </div>
  );
}

export default List;