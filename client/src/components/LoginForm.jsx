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
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useSignIn();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
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
          userState: {
            id: res.data.username,
            username: res.data.username,
            accessToken: res.data.token,
          },
        })
      ) {
        navigate("/todos");
      } else {
        setLogInFailed(true);
      }
    } catch (e) {
      setLogInFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-auto sm:w-1/2 md:w-1/4 rounded-lg flex flex-col items-center justify-center p-4 backdrop-blur-lg border-2">
      <h1 className="text-5xl m-4 font-bold text-white font-circular ">
        Login
      </h1>
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
            <span className="text-red-500 mb-3">
              Invalid email or password.
            </span>
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
      )}
    </div>
  );
}
