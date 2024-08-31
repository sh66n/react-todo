import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/api";

export default function LoggedInAs({ user }) {
  return (
    <div className=" w-full h-28 flex items-center absolute top-12 font-circular">
      <div className="h-12 w-auto bg-gray-900 ml-auto mr-12 flex items-center p-2 rounded-full text-white z-0 top-12">
        Logged in as {user}
      </div>
    </div>
  );
}
