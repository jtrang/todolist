import TaskCard, { type TaskProps } from "./TaskCard";
import "./List.css";
import NewTask from './NewTask';

export interface ListProps {
  _id: string;
  title: string;
  tasks: TaskProps[];
}

function handleSubmit(_id: string, event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  fetch("http://localhost:3000/api/task/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      title: event.target.newTaskTitle.value
    })
  }).then(res => console.log(res));
}

export function List({ _id, title, tasks }: ListProps) {

  return (
    <div key={_id}>
      <h2>{title}</h2>

      <ul className="list">
        {tasks.map((task) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </ul>

      <NewTask handleSubmit={(event) => handleSubmit(_id, event)} />
    </div>
  );
}

export default List;