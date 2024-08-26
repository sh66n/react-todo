import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, data, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <input {...register("password", { required: true })} type="password" />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
