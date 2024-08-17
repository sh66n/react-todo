import React, { useState } from "react";
import "../styles/Todo.css";
import TodoEditForm from "./TodoEditForm";

export default function Todo({
  task,
  isCompleted,
  onDoubleClick,
  deleteTodo,
  todoId,
  editTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleView = () => {
    setIsEditing((currState) => !currState);
  };

  return (
    <div className="Todo">
      {isEditing ? (
        <TodoEditForm
          todoText={task}
          toggleView={toggleView}
          todoId={todoId}
          editTodo={editTodo}
        />
      ) : (
        <div
          style={{ color: isCompleted ? "green" : "red" }}
          onDoubleClick={onDoubleClick}
        >
          {task}
        </div>
      )}

      <button onClick={toggleView} disabled={isEditing ? true : false}>
        edit
      </button>
      <button onClick={deleteTodo} disabled={isEditing ? true : false}>
        delete
      </button>
    </div>
  );
}
