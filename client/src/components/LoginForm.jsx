import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(`${BASE_URL}/login`, data, {
      withCredentials: true,
    });
    if (res.status === 200) {
      navigate("/todos");
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
