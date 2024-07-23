import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onAuth }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: 'signin', credentials }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "User signed in successfully") {
          onAuth(true);
          navigate("/todo");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error signing in: " + error.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="max-w-md mx-auto h-20 flex items-center justify-center rounded-md text-3xl font-bold text-blue-400 mb-4 bg-black">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="flex-col gap-4">
        <div className="flex flex-col max-w-md mx-auto items-center justify-center sm:flex-row gap-2 mb-4">
          <label className="font-mono m-4 text-xl">Username:</label>
          <input
            className="font-semibold p-2 border bg-transparent rounded"
            type="text"
            name="username"
            placeholder="Enter Username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white text-lg rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
