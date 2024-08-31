import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="h-screen w-screen flex items-center justify-center bg-ambient bg-cover ">
        <LoginForm />
      </div>
    </div>
  );
}
