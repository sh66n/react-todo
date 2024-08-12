const mongoose = require("mongoose");
const Todo = require("./todos");

const listSchema = new mongoose.Schema({
  name: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const List = mongoose.model("List", listSchema);
module.exports = List;
