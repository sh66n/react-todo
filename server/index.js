const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  optionSuccessStatus: 200,
  exposedHeaders: ["Set-cookie"],
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
  //   jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
  //     if (err) {
  //       console.log("Wrong cookie");
  //       res.json({ status: false });
  //       return;
  //     } else {
  //       const currUser = await User.findById(decodedToken.id);
  //       if (currUser) {
  //         req.user = currUser;
  //         next();
  //       } else {
  //         res.json({ status: false });
  //         return;
  //       }
  //     }
  //   });
  // } else {
  //   console.log("no cookie");
  //   res.json({ status: false });
  //   return;
  // }
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("Wrong cookie");
        res.json({ status: false });
        return;
      } else {
        const currUser = await User.findById(decodedToken.id);
        if (currUser) {
          req.user = currUser;
          next();
        } else {
          res.json({ status: false });
          return;
        }
      }
    });
  } else {
    console.log("no cookie");
    res.json({ status: false });
    return;
  }
};

//server side routing
app.get("/api/todos", async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("Wrong cookie");
        res.json({ status: false });
        return;
      } else {
        const currUser = await User.findById(decodedToken.id);
        if (currUser) {
          req.user = currUser;
          const todos = await Todo.find({ userId: req.user._id });
          res.send(todos);
        } else {
          res.json({ status: false });
          return;
        }
      }
    });
  } else {
    console.log("no cookie");
    res.json({ status: false });
    return;
  }
});

app.get("/api/users/:id", verifyToken, async (req, res) => {
  res.send(req.user);
});

app.post("/api/check", verifyToken, (req, res) => {
  res.send(req.user);
});

app.post("/api/todos", verifyToken, async (req, res) => {
  req.body.userId = req.user._id;
  const newTodo = await Todo.create(req.body);
  res.send(newTodo);
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, email, password: plainPassword } = req.body;
    const emailExists = await User.find({ email });
    const usernameExists = await User.find({ username });
    if (!(emailExists.length > 0)) {
      if (!(usernameExists.length > 0)) {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(plainPassword, salt);
        const newUser = await User.create({ username, email, hash });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: 3 * 24 * 60 * 60,
        });
        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json(newUser);
      } else {
        res.json({
          message: "Username already in use",
        });
      }
    } else {
      res.json({
        message: "Email already in use",
      });
    }
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({
        message: "incorrect email or password",
      });
    }
  } else {
    res.status(400).json({
      message: "incorrect email or password",
    });
  }
});

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
