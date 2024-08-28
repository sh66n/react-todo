import React from "react";
import fancyImage from "../assets/img/landing.svg";

export default function Landing() {
  return (
    <div className="h-screen w-100 bg-green-900">
      <div className="h-auto w-full bg-lime-700 fixed flex">
        <div>DoIt List</div>

        <div>My List</div>
        <div>Sign Up</div>
      </div>
      <div className="flex h-screen">
        <div className="w-1/2 mt-auto ml-6 text-green-400 ">
          <h1 className="text-9xl font-circular font-extrabold">DoIt List </h1>
          <h2 className="ml-12 mb-24">
            Struggling to keep up with work? DoIt List is here to rid you of you
            problems!
          </h2>
        </div>
        <div className="w-1/2">
          <img src={fancyImage} alt="hey" />
        </div>
      </div>
    </div>
  );
}
