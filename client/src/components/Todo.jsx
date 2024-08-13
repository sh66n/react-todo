import React from "react";
import "../styles/Todo.css";

export default function Todo({ task, isCompleted }) {
  const handleDoubleClick = () => {
    console.log("double click");
  };
  return (
    <div
      className="Todo"
      style={{ color: isCompleted ? "green" : "red" }}
      onDoubleClick={handleDoubleClick}
    >
      {task}

      <button>Edit</button>
    </div>
  );
}
