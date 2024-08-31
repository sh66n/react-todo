import React, { useEffect, useState } from "react";
import fancyImage from "../assets/img/landing.svg";
import Navbar from "../components/Navbar";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function Landing() {
  const cookie = new Cookies();
  const logOut = () => {
    cookie.remove("jwt");
    setIsLoggedIn(false);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const verifyUser = () => {
      if (cookie.get("jwt")) {
        setIsLoggedIn(true);
      }
    };
    verifyUser();
  }, [cookie]);
  return (
    <div className="overflow-x-hidden">
      <div className="h-screen w-screen bg-ambient bg-cover overflow-x-hidden">
        <Navbar isLoggedIn={isLoggedIn} logOut={logOut} />
        <div className="h-screen w-screen flex flex-col items-center justify-center font-circular p-4">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-white">
            DoIt List{" "}
          </h1>
          <h2 className="md:text-xl md:font-bold text-white text-center ">
            Struggling to keep up with work? We're here to help!
          </h2>
          <button className="p-4 m-4 bg-fuchsia-900 text-white transition ease-in-out hover:-translate-y-2 rounded-full duration-300 w-fit">
            <Link to={"/todos"}>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
