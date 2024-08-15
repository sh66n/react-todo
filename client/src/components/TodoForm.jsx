import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function TodoForm({ addTodo }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("making reqs");
    reset();
    data.isCompleted = false;
    addTodo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="TodoForm">
      <input
        type="text"
        {...register("task", { required: true })}
        placeholder="Task"
      />
      {errors.task && <span>This field is required</span>}
      <button type="submit">Add Todo</button>
    </form>
  );
}
