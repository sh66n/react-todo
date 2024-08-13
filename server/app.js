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
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const Todo = require("./models/todos");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/api/todos", async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.json({
    newTodo,
  });
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

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id, {
    new: true,
  });
  res.json({
    deletedTodo,
  });
});

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
