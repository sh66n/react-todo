import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [userCreationFailed, setUserCreationFailed] = useState(false);

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
      if (res.data.message) {
        console.log(res.data.message);
        setUserCreationFailed(true);
      } else {
        navigate("/todos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-auto sm:w-1/2 md:w-1/4 rounded-md flex flex-col items-center justify-center p-4 backdrop-blur-lg border-2">
      <h1 className="text-5xl m-4 font-bold text-white font-circular ">
        Sign up!
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center">
          <input
            {...register("username", { required: true })}
            className="flex m-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white "
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-white">This field is required</span>
          )}

          <input
            {...register("email", { required: true })}
            className="flex m-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-white">This field is required</span>
          )}

          <input
            {...register("password", { required: true })}
            type="password"
            className="flex m-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-white">This field is required</span>
          )}
        </div>
        {userCreationFailed && (
          <span className="text-red-500 mb-3">
            Validation failed. Please try again.
          </span>
        )}
        <span className="font-circular mb-2 text-white">
          Already a user? Login{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            here
          </a>
          .
        </span>
        <button
          type="submit"
          className="w-full p-4 m-2 rounded-full bg-white font-bold opacity-100 hover:opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}
