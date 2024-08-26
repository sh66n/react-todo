import React, { useEffect } from "react";
import TodoList from "../components/TodoList";
import { PrimaryButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function Todos() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${BASE_URL}/check`,
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookies("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookies]);
  const logOut = () => {
    removeCookies("jwt");

    navigate("/login");
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      <TodoList />
      <PrimaryButton text={"Logout"} onClick={logOut} isDisabled={false} />
    </div>
  );
}
