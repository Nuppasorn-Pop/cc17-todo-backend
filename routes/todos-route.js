const express = require("express");
const router = express.Router();
const todosController = require("../controller/todos-controller");

// GET /todos
router.get("/", todosController.getAllTodos);
// POST  /todos
router.post("/", todosController.createTodo);
// PUT   /todos/:id
router.put("/:id", todosController.updateTodo);
// DELETE  /todos/:id
router.delete("/:id", todosController.deletTodo);
// GET   /todos/all-status
router.get("/all-status", todosController.getAllStatus);

module.exports = router;
