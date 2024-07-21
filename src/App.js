import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Todo from "./components/Todo";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route
            path="/signin"
            element={<SignIn onAuth={handleAuthentication}></SignIn>}
          ></Route>
          <Route
            path="/todo"
            element={isAuthenticated ? <Todo></Todo> : redirect("/signin")}
          ></Route>
          <Route path="/" element={<SignUp></SignUp>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
