const jsonServer = require("json-server");
const fetch = require("node-fetch");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// const express = require("express");
// const router =express.Router();
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const JSON_SERVER_URL = "https://todo-list-8p53.onrender.com/users";

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   console.log("GET request received at /");
//   // res.send("Welcome to the Todo App backend server");
// });

// server.get("/users", (req, res) => {
//   const users = router.db.get("users").value();
//   res.json(users);
// });

// server.post("/signup", (req, res) => {
//   const { username, password } = req.body;
//   const users = router.db.get("users").value();

//   if (users.some((user) => user.username === username)) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const newUser = { username, password };
//   router.db.get("users").push(newUser).write();
//   res.status(201).json({ message: "User signed up successfully" });
// });

// server.post("/signin", (req, res) => {
//   const { username, password } = req.body;
//   const users = router.db.get("users").value();

//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (user) {
//     res.status(200).json({ message: "User signed in successfully" });
//   } else {
//     res.status(400).json({ message: "Invalid credentials" });
//   }
// });

server.post("/users", async (req, res) => {
  console.log(req.body);
  const { action, userData: { username, password } = {} } = req.body;
  // const { username, password } = userData;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password is missing" });
  }

  if (action === "signup") {
    console.log("POST request received at /signup", req.body);

    try {
      const response = await fetch(JSON_SERVER_URL);
      const users = await response.json();
      // const users = router.db.get("users").value();
      console.log(users);

      if (users.some((user) => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
      }
      console.log(username);
      console.log(password);
      const newUser = { id: Date.now().toString(), username, password };
      console.log(newUser);
      const postResponse = await fetch(JSON_SERVER_URL, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const postResponseData = await postResponse.json();
      console.log('Post response status:', postResponse.status);
      console.log('Post response data:', postResponseData);

      if (!postResponse.ok) {
        throw new Error(`Failed to create user: ${postResponseData.message || 'Unknown error'}`);
      }

      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    console.log("POST request received at /signin", req.body);

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
  }
});

// server.post("/users", async (req, res) => {
//   const { action, userData } = req.body;
//   const { username, password } = userData;
//   console.log("POST request received at /signin", req.body);

//   try {
//     const response = await fetch(JSON_SERVER_URL);
//     const users = await response.json();

//     const user = users.find(
//       (user) => user.username === username && user.password === password
//     );

//     if (user) {
//       res.status(200).json({ message: "User signed in successfully" });
//     } else {
//       res.status(400).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during signin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
