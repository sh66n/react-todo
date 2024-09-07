const mongoose = require("mongoose");
const User = require("./user");

const todoSchema = new mongoose.Schema({
  task: String,
  isCompleted: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
