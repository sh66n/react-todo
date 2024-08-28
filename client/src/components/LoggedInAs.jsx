import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/api";

export default function LoggedInAs({ user }) {
  return (
    <div className=" w-full h-28 mb- flex items-center">
      <div className="h-12 w-auto bg-gray-900 ml-auto mr-12 flex items-center p-2 rounded-full	text-white">
        Logged in as {user}
      </div>
    </div>
  );
}
