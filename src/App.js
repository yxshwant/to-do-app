import React, { useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Todo from "./components/Todo";
import "./App.css";
import SignOut from "./components/SignOut";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleAuthentication = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route
            path="/signin"
            element={<SignIn onAuth={handleAuthentication}></SignIn>}
          ></Route>
          <Route
            path="/signout"
            element={<SignOut onAuth={handleAuthentication} />}
          />
          <Route
            path="/todo"
            element={
              isAuthenticated ? <Todo></Todo> : <Navigate to="/signin" />
            }
          ></Route>
          <Route path="/" element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
