import React from "react";
import fancyImage from "../assets/img/landing.svg";

export default function Landing() {
  return (
    <div className="h-screen w-100 flex">
      <div className="w-50">lets do from here</div>
      <div className="w-50">
        <img src={fancyImage} alt="hey" />
      </div>
    </div>
  );
}
