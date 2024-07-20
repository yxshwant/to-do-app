const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 5000;
const JSON_SERVER_URL = "http://localhost:5500/users";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("GET request received at /");
  res.send("Welcome to the Todo App backend server");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  // console.log("POST request received at /signup", req.body);

  try {
    const response = await fetch(JSON_SERVER_URL);
    const users = await response.json();

    if (users.some((user) => user.username === username)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { username, password };
    const postResponse = await fetch(JSON_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to create user");
    }

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  // console.log("POST request received at /signin", req.body);

  try {
    const response = await fetch(JSON_SERVER_URL);
    const users = await response.json();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      res.status(200).json({ message: "User signed in successfully" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});