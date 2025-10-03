const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});
router.get('/test', (req, res) => {
  res.json({ message: 'route works' });
});

// POST a new todo
router.post("/", async (req, res) => {
  try {
   let dateStart = req.body.date_start
   //check for match date format YYYY-MM-DD
    if(!dateStart.match(/^\d{4}-\d{2}-\d{2}$/)){
      return res.status(400).json("Error: Date format should be YYYY-MM-DD");
    }
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json("Todo deleted successfully");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/search", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const todos = await Todo.find();
      return res.json(todos);
    }

    const todos = await Todo.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
