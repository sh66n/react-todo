import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import Cookies from "universal-cookie";
import LoggedInAs from "./LoggedInAs";
import Navbar from "./Navbar";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodoData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL}/todos`,
        {
          withCredentials: true,
        }
      );
      setTodos(data);
    };
    getTodoData();
  }, []);

  const addTodo = async (newTodo) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASEURL}/todos`,
      newTodo,
      {
        withCredentials: true,
      }
    );
    setTodos((prevTodos) => {
      return [...prevTodos, data];
    });
  };

  const deleteTodo = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/todos/${id}`,
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      console.log(e);
      return;
    }
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo._id !== id);
    });
  };

  const editTodo = async (id, edits) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASEURL}/todos/${id}`,
      edits
    );
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
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASEURL}/todos/${id}`,
      {
        isCompleted: !todo.isCompleted,
      }
    );
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

  //auth
  const signOut = useSignOut();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.get("jwt")) {
        console.log("no cookie found");
        //no cookie found
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/check`,
          {},
          { withCredentials: true }
        );
        if (!data) {
          //cookie exists, but is not the correct
          cookies.remove("jwt");
          navigate("/login");
        } else {
          setUser(data.username);
          setUserExists(true);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  return (
    <div>
      <Navbar isLoggedIn={userExists} logOut={signOut} />
      <div className="flex flex-col items-center justify-center h-screen z-3">
        {/* {userExists && <LoggedInAs user={user} />} */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-5 text-white font-circular">
            <span className="text-blue-400">{user}</span>'s List
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
        </div>
      </div>
    </div>
  );
}
