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
  const auth = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTodoData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/todos`,
          {
            headers: {
              Authorization: "Bearer " + auth.accessToken,
            },
          }
        );
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTodoData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/todos`,
        newTodo,
        {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      setTodos((prevTodos) => {
        return [...prevTodos, data];
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/todos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo._id !== id);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const editTodo = async (id, edits) => {
    try {
      setIsLoading(true);
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
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsDone = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      try {
        setIsLoading(true);
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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    // let todo;
    // try {
    //   todo = todos.find((todo) => todo._id === id);
    // } catch (e) {
    //   console.log(e);
    //   return;
    // }
  };

  //cookie management
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  // //auth
  // const signOut = useSignOut();

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
          { headers: { Authorization: "Bearer " + auth.accessToken } }
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
      <Navbar isLoggedIn={userExists} />
      <div className="flex flex-col items-center justify-center h-screen z-3">
        {/* {userExists && <LoggedInAs user={user} />} */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-5 text-white font-circular">
            <span className="text-blue-400">{auth.username}</span>'s List
          </h1>
          <TodoForm addTodo={addTodo} />
          {todos.length === 0 && (
            <span className="text-white">
              No todos yet. What are you waiting for?
            </span>
          )}
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            todos.map((todo) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
