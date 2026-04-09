import "./Task.css";

export interface TaskProps {
  _id: string;
  title: string;
  isComplete: boolean;
  onCheckTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TaskCard({ _id, title, isComplete, onCheckTask }: TaskProps) {
  return (
    <li key={_id} className="taskCard">
      <input className="checkbox" type="checkbox" checked={isComplete} onChange={onCheckTask} />
      <p className="title">{title}</p>
    </li>
  );
}

export default TaskCard;