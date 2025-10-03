const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date_start: {
    type: String, 
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
 
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;