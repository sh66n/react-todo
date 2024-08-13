import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo task={todo.task} isCompleted={todo.isCompleted} key={todo._id} />
      ))}
    </div>
  );
}
