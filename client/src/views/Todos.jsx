import React from "react";
import TodoList from "../components/TodoList";

export default function Todos() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <TodoList />
    </div>
  );
}
