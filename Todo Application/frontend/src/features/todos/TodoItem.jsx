import React from "react"
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../slices/todoApiSlice.jsx"

export default function TodoItem({ todo, onEdit }) {
  const [deleteTodo, { isLoading: deleting }] =
    useDeleteTodoMutation()
  const [updateTodo, { isLoading: updating }] =
    useUpdateTodoMutation()

  const toggleStatus = async () => {
    const order = ["Pending", "In-Progress", "Completed"]
    const next =
      order[
        (order.indexOf(todo.status) + 1) % order.length
      ] || "Pending"
    try {
      await updateTodo({
        id: todo._id,
        status: next,
      }).unwrap()
    } catch (err) {
      console.error(err)
      alert("Status update failed")
    }
  }

  return (
    <div className="todo-item card">
      <div className="todo-left">
        <div>
          <div className="title">{todo.title}</div>
          <div className="desc">{todo.description}</div>
          <div className="small">
            Created:{" "}
            {new Date(todo.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="controls">
        <button
          className="btn secondary"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>
        <button
          className="btn secondary"
          onClick={toggleStatus}
          disabled={updating}
        >
          {updating ? "..." : todo.status}
        </button>
        <button
          className="btn"
          onClick={() => deleteTodo(todo._id)}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  )
}
