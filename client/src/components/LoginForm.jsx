import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Cookies from "universal-cookie";

import useSignIn from "react-auth-kit/hooks/useSignIn";

export default function LoginForm() {
  const cookie = new Cookies();
  const [logInFailed, setLogInFailed] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = useSignIn();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/login`,
        data,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("jwt"),
          },
        }
      );

      if (
        signIn({
          auth: {
            token: res.data.token,
            type: "Bearer",
          },
        })
      ) {
        navigate("/todos");
      } else {
        setLogInFailed(true);
      }
    } catch (e) {
      setLogInFailed(true);
    }
  };

  return (
    <div className="h-auto sm:w-1/2 md:w-1/4 rounded-lg flex flex-col items-center justify-center p-4 backdrop-blur-lg border-2">
      <h1 className="text-5xl m-4 font-bold text-white font-circular ">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col justify-center items-center">
          <input
            {...register("email", { required: true })}
            className={
              "flex m-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            }
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-white">This field is required</span>
          )}
          <input
            {...register("password", { required: true })}
            className={
              "flex m-4 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            }
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-white">This field is required</span>
          )}
        </div>
        {logInFailed && (
          <span className="text-red-500 mb-3">Invalid email or password.</span>
        )}
        <span className="font-circular mb-2 text-white">
          Don't have an account? Sign up{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            here
          </a>
          .
        </span>
        <button
          type="submit"
          className="w-full p-4 m-2 rounded-full bg-white font-bold opacity-100 hover:opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  );
}
