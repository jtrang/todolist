import "./Task.css";
import { useEffect, useState, useRef } from "react";
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export interface TaskProps {
  _id: string;
  title: string;
  isComplete: boolean;
  onCheckTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteTask: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function TaskCard({ _id, title, isComplete, onCheckTask, onDeleteTask }: TaskProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  /**
   * TODO: what's in the dependency list?
   *       what's `invariant(el)` https://atlassian.design/components/pragmatic-drag-and-drop/tutorial
   */
  useEffect(() => {
    const el = ref.current;
    
    // We must check if `el` exists because React refs start as `null`
    if (!el) return;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })

  }, []);

  return (
    <li ref={ref} key={_id} className="taskCard">
      <input className="checkbox" type="checkbox" checked={isComplete} onChange={onCheckTask} />
      <p className="title">{title}</p>
      <button onClick={onDeleteTask}>Delete</button>
    </li>
  );
}

export default TaskCard;