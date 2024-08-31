import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function TodoEditForm({
  todoText,
  toggleView,
  todoId,
  editTodo,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    editTodo(todoId, data);
    toggleView();
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center"
    >
      <input
        defaultValue={todoText}
        {...register("task", { required: true })}
        autoFocus
        onFocus={handleFocus}
        className="rounded-full p-1 mx-3 w-fit text-black"
      />
      {errors.task && <span>Todo cannot be empty</span>}
      <input type="submit" hidden />
      <button type="submit">Edit</button>
    </form>
  );
}
