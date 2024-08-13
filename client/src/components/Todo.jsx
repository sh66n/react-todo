import React from "react";

export default function Todo({ task, isCompleted }) {
  return (
    <div className="Todo" style={{ color: isCompleted ? "green" : "red" }}>
      {task}
    </div>
  );
}
