import React, { useState } from "react"
import TodoList from "./features/todos/TodoList"
import TodoForm from "./features/todos/TodoForm"
import "./App.css"

function App() {
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState("")

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <TodoForm
            editing={editing}
            setEditing={setEditing}
          />
          <div className="filters">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">
                In-Progress
              </option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <TodoList
          setEditing={setEditing}
          statusFilter={filter}
        />
      </div>
    </>
  )
}

export default App
