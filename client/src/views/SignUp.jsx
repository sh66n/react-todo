import React from "react";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/Navbar";

export default function SignUp() {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="h-screen w-screen flex items-center justify-center bg-ambient bg-cover ">
        <SignUpForm />
      </div>
    </div>
  );
}
