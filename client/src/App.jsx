import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Landing from "./views/Landing";
import Todos from "./views/Todos";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function App() {
  const store = createStore({
    authType: "cookie",
    authName: "jwt",
    cookieDomain: window.location.hostname,
    cookieSecure: true,
  });

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/todos" element={<Todos />} />
          </Route> */}
          <Route
            path={"/todos"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Todos />
              </RequireAuth>
            }
          />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
