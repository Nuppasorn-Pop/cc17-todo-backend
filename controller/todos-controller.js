const getAllTodos = (req, res, nent) => {
  console.log("in todos");
  console.log(req.user);
  res.json({ message: `In getAllTodos , ${req.user.username}` });
};
const createTodo = (req, res, nent) => {};
const updateTodo = (req, res, nent) => {};
const deletTodo = (req, res, nent) => {};
const getAllStatus = (req, res, nent) => {};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deletTodo,
  getAllStatus,
};
