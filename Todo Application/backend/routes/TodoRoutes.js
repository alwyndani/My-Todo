import express from "express"
import {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/TodoControllers.js"

const TodoRouter = express.Router()

TodoRouter.route("/").get(getTodos).post(createTodo)
TodoRouter.route("/:id")
  .patch(updateTodo)
  .get(getTodo)
  .delete(deleteTodo)

export default TodoRouter
