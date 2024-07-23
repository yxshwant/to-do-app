import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for storing error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error message on input change
  };

  const validateForm = () => {
    if (!userData.username || !userData.password) {
      setError("Username and Password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          const error = response.json();
          throw new Error(error.message);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "SUCCESS") {
          alert(data.message);
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error signing up: " + error.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="max-w-md mx-auto h-20 flex items-center justify-center rounded-md text-3xl font-bold text-blue-400 mb-4 bg-black">
        Sign Up
      </h2>
      {error && <p className="text-xl text-red-500 mb-4">{error}</p>}
      {/* Display error message */}
      <form onSubmit={handleSubmit} className="flex-col gap-4">
        <div className="flex flex-colflex flex-col max-w-md mx-auto items-center justify-center sm:flex-row gap-2 mb-4">
          <label className="font-mono m-4 text-xl">Username:</label>
          <input
            className="font-semibold p-2 border bg-transparent rounded"
            type="text"
            name="username"
            placeholder="Enter Username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col max-w-md mx-auto items-center justify-center sm:flex-row gap-2 mb-4">
          <label className="font-mono m-4 text-xl">Password:</label>
          <input
            className="font-semibold p-2 border bg-transparent rounded"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white text-lg rounded"
        >
          Sign Up
        </button>
        <p className="text-blue-600 text-lg mt-3">
          Already signed up?{" "}
          <Link to="/signin" className="text-blue-600 underline">
            Sign-In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
