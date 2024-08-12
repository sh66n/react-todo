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

const Todo = require("./models/todos");
const List = require("./models/todoLists");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/lists", async (req, res) => {
  const lists = await List.find({});
  res.json(lists);
});

app.post("/api/lists/new", async (req, res) => {
  const newList = await List.create(req.body);
  res.status(200).json({
    newList,
  });
});

app.get("/api/lists/:id", async (req, res) => {
  const { id } = req.params;
  const foundList = await List.findById(id);
  res.status(200).json({
    foundList,
  });
});

app.patch("/api/lists/:id/edit", async (req, res) => {
  const { id } = req.params;
  const updatedList = await List.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    updatedList,
  });
});

app.delete("/api/lists/:id", async (req, res) => {
  const { id } = req.params;
  const deletedList = await List.findByIdAndDelete(id, {
    new: true,
  });
  res.json({
    deletedList,
  });
});

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
