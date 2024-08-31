import React from "react";
import TodoList from "../components/TodoList";
import LoggedInAs from "../components/LoggedInAs";

export default function Todos() {
  return (
    <div className="h-screen w-screen flex flex-col bg-ambient bg-cover">
      <TodoList />
    </div>
  );
}
