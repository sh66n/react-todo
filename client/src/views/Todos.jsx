import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodoData = async () => {
      const { data } = await axios.get(`${BASE_URL}/todos`);
      setTodos(data);
    };
    getTodoData();
  }, [todos]);

  return (
    <div className="Todos">
      <TodoList todos={todos} />
    </div>
  );
}
