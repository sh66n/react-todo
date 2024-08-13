import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

const BASE_URL = "http://localhost:3000/api";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  // console.log(todos);
  useEffect(() => {
    const getTodoData = async () => {
      const { data } = await axios.get(`${BASE_URL}/todos`);
      setTodos(data);
    };
    getTodoData();
  }, []);

  const addTodo = async (newTodo) => {
    const { data } = await axios.post(`${BASE_URL}/todos`, newTodo);
    setTodos((prevTodos) => {
      return [...prevTodos, data];
    });
  };

  return (
    <div className="Todos">
      <TodoList todos={todos} />
      <TodoForm addTodo={addTodo} />
    </div>
  );
}
