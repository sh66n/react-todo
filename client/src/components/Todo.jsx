import React, { useState } from "react";
import "../styles/Todo.css";
import TodoEditForm from "./TodoEditForm";
import { PrimaryButton } from "./Button";

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
    <div
      className={
        "flex m-2 w-fit select-none cursor-pointer rounded-lg " +
        (isCompleted
          ? "bg-lime-500 line-through text-slate-400 decoration-slate-400 "
          : "bg-red-600 text-white")
      }
    >
      {isEditing ? (
        <TodoEditForm
          todoText={task}
          toggleView={toggleView}
          todoId={todoId}
          editTodo={editTodo}
        />
      ) : (
        <div
          className={
            "p-1 m-1 md:p-3 md:m-3 font-bold flex items-center justify-center"
          }
          onDoubleClick={onDoubleClick}
        >
          {task}
        </div>
      )}

      {/* <button
        className="px-3 py-2 bg-slate-900 text-white rounded-md	"
        onClick={toggleView}
        disabled={isEditing ? true : false}
      >
        edit
      </button> */}
      <PrimaryButton
        text={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        }
        isDisabled={false}
        onClick={toggleView}
      />
      <PrimaryButton
        text={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        }
        isDisabled={false}
        onClick={deleteTodo}
      />
      <button
        className="md:hidden p-1.5 m-1.5 md:p-3 md:m-3 bg-slate-900 text-white rounded-full hover:bg-slate-800"
        onClick={onDoubleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
    </div>
  );
}
