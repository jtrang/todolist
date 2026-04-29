import "./Task.css";

export interface TaskProps {
  _id: string;
  title: string;
  isComplete: boolean;
  onCheckTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteTask: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function TaskCard({ _id, title, isComplete, onCheckTask, onDeleteTask }: TaskProps) {
  return (
    <li key={_id} className="taskCard">
      <input className="checkbox" type="checkbox" checked={isComplete} onChange={onCheckTask} />
      <p className="title">{title}</p>
      <button onClick={onDeleteTask}>Delete</button>
    </li>
  );
}

export default TaskCard;