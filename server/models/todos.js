const mongoose = require("mongoose");
const User = require("./user");

const todoSchema = new mongoose.Schema({
  task: String,
  isCompleted: Boolean,
  userId: mongoose.Schema.Types.ObjectId,
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
