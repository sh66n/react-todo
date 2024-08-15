import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
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

  const markAsDone = async (id) => {
    let todo;
    try {
      todo = todos.find((todo) => todo._id === id);
    } catch (e) {
      console.log(e);
      return;
    }
    const { data } = await axios.patch(`${BASE_URL}/todos/${id}`, {
      isCompleted: !todo.isCompleted,
    });
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo._id === id) return data.updatedTodo;
        else return todo;
      });
    });
  };

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          task={todo.task}
          isCompleted={todo.isCompleted}
          key={todo._id}
          onDoubleClick={() => {
            markAsDone(todo._id);
          }}
        />
      ))}
      <TodoForm addTodo={addTodo} />
    </div>
  );
}
