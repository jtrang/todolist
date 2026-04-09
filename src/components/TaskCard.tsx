import "./TaskCard.css";

export interface TaskProps {
  _id: string;
  title: string;
  isComplete: boolean;
}

function TaskCard({ _id, title, isComplete }: TaskProps) {
  return (
    <li key={_id} className="taskCard">
      <input className="checkbox" type="checkbox" checked={isComplete} />
      <p className="title">{title}</p>
    </li>
  );
}

export default TaskCard;