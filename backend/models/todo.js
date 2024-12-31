const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    default: "medium",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to  user model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
