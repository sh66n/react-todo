import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const toggleMenu = () => {
    setIsToggled((currState) => !currState);
  };
  return (
    <div className=" w-full fixed flex flex-col mt-0 backdrop-blur-sm">
      <div className="flex">
        <div className="font-circular text-4xl text-white">
          <div className="m-4 md:ml-20">
            <Link to={"/"}>GetitDone</Link>
          </div>
        </div>
        <div className="ml-auto md:mr-20 flex">
          <div className="hidden md:flex md:m-4 md:px-4 rounded-full md:text-2xl font-circular items-center text-white">
            <Link
              to={"/todos"}
              className="opacity-100 hover:opacity-50 ease-in-out"
            >
              My List
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="hidden md:flex md:m-4 md:text-2xl font-circular flex items-center text-white">
              <Link
                className="opacity-100 hover:opacity-50 ease-in-out"
                onClick={() => {
                  signOut();
                }}
                to={"/login"}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex">
              <div className="hidden md:flex sm:m-2 md:m-4 md:text-2xl font-circular items-center text-white">
                <Link to={"/login"} className="opacity-100 hover:opacity-50">
                  Login
                </Link>
              </div>
              <div className="hidden md:flex md:m-4 md:text-2xl font-circular items-center text-white">
                <Link to={"/signup"} className="opacity-100 hover:opacity-50">
                  Signup
                </Link>
              </div>
            </div>
          )}
          {isToggled ? (
            <div
              className="md:m-4 md:text-2xl font-circular flex items-center text-white md:hidden mr-6"
              onClick={toggleMenu}
            >
              <span className="opacity-100 hover:opacity-50 hover:cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          ) : (
            <div
              className="md:m-4 md:text-2xl font-circular flex items-center text-white md:hidden mr-6"
              onClick={toggleMenu}
            >
              <span className="opacity-100 hover:opacity-50 hover:cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
      {isToggled && (
        <div className="collapsible w-full relative block md:hidden bg-slate-500 rounded-b-lg">
          <ul className="text-white font-circular text-center">
            <li className="my-2">
              <Link to={"/todos"}>My List</Link>
            </li>
            {isLoggedIn ? (
              <li className="my-2">
                <Link
                  onClick={() => {
                    signOut();
                  }}
                  to={"/login"}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <span>
                <li className="my-2">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="my-2">
                  <Link to={"/signup"}>Signup</Link>
                </li>
              </span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
