import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./Button";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function TodoForm({ addTodo }) {
  const auth = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    reset();
    data.isCompleted = false;
    addTodo(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center bg-slate-500 px-1 w-auto rounded-full mb-3"
    >
      <input
        type="text"
        {...register("task", { required: true })}
        placeholder="Task"
        className="rounded-full p-1 mx-3"
      />
      {errors.task && <span>This field is required</span>}
      <PrimaryButton text={"Add Todo"} isDisabled={false} />
    </form>
  );
}
