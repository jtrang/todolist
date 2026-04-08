import "./TaskCard.css";

function TaskCard({ key, title, isComplete }: { key: string, title: string, isComplete: boolean }) {
  return (
    <li key={key} className="taskCard">
      <input className="checkbox" type="checkbox" checked={isComplete} />
      <p className="title">{title}</p>
    </li>
  );
}

export default TaskCard;