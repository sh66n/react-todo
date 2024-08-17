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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={todoText}
        {...register("task", { required: true })}
        autoFocus
        onFocus={handleFocus}
      />
      <input type="submit" hidden />
    </form>
  );
}
