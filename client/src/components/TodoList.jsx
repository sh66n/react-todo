import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import Cookies from "universal-cookie";
import LoggedInAs from "./LoggedInAs";

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
    const { data } = await axios.post(`${BASE_URL}/todos`, newTodo, {
      withCredentials: true,
    });
    console.log(data);
    setTodos((prevTodos) => {
      return [...prevTodos, data];
    });
  };

  const deleteTodo = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/todos/${id}`, {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e.response.data);
      return;
    }
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo._id !== id);
    });
  };

  const editTodo = async (id, edits) => {
    const { data } = await axios.patch(`${BASE_URL}/todos/${id}`, edits);
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo._id === id) return data.updatedTodo;
        else return todo;
      });
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

  //cookie management
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.get("jwt")) {
        //no cookie found
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${BASE_URL}/check`,
          {},
          { withCredentials: true }
        );
        if (!data) {
          //cookie exists, but is not the correct
          cookies.remove("jwt");
          navigate("/login");
        } else {
          setUser(data.email);
          setUserExists(true);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const logOut = () => {
    cookies.remove("jwt");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center mb-auto">
      {userExists && <LoggedInAs user={user} />}
      <h1 className="text-5xl font-bold font-mono mb-5 text-white">
        Get it done
      </h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          task={todo.task}
          isCompleted={todo.isCompleted}
          onDoubleClick={() => {
            markAsDone(todo._id);
          }}
          deleteTodo={() => {
            deleteTodo(todo._id);
          }}
          editTodo={editTodo}
          todoId={todo._id}
        />
      ))}
      <PrimaryButton text={"Logout"} onClick={logOut} isDisabled={false} />
    </div>
  );
}
