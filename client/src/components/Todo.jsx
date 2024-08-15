import React from "react";
import "../styles/Todo.css";

export default function Todo({ task, isCompleted, onDoubleClick }) {
  return (
    <div
      className="Todo"
      style={{ color: isCompleted ? "green" : "red" }}
      onDoubleClick={onDoubleClick}
    >
      {task}

      {/* <button>Edit</button> */}
    </div>
  );
}
