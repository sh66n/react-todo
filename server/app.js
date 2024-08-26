const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/todolist")
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const Todo = require("./models/todos");
const User = require("./models/user");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//middleware
const verifyToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  // if (authHeader) {
  //   const token = authHeader.split(" ")[1];
  //   console.log(token);
  //   jwt.verify(token, "mysecret", (err, payload) => {
  //     if (err) {
  //       res.status(403).json("Token not valid!");
  //     }
  //     req.user = payload;
  //     next();
  //   });
  // } else {
  //   res.status(401).json("You are not authenticated!");
  // }
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mysecret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        return;
      } else {
        const currUser = await User.findById(decodedToken.id);
        if (currUser) {
          res.json({ status: true, currUser });
          next();
        } else res.json({ status: false });
        return;
      }
    });
  } else {
    res.json({ status: false });
    return;
  }
};

//server side routing
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/api/todos", verifyToken, async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.send(newTodo);
});

app.post("/api/check", verifyToken);

app.post("/api/users", async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(plainPassword, salt);
    const newUser = await User.create({ email, hash });
    const token = jwt.sign({ id: newUser._id }, "mysecret", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const requestedTodo = await Todo.findById(id);
  res.json({
    requestedTodo,
  });
});

app.patch("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    updatedTodo,
  });
});

app.delete("/api/todos/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id, {
    new: true,
  });
  res.json({
    deletedTodo,
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isAuthenticated = await bcrypt.compare(password, user.hash);
    if (isAuthenticated) {
      const token = jwt.sign({ id: user._id }, "mysecret", {
        expiresIn: 3 * 24 * 60 * 60,
      });
      res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json("incorred email or password");
    }
  } else {
    res.status(400).json("incorred email or password");
  }
});

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
