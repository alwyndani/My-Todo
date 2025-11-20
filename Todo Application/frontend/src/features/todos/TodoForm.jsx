import React, { useEffect, useState } from "react"
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "../../slices/todoApiSlice.jsx"

export default function TodoForm({ editing, setEditing }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  })
  const [addTodo, { isLoading: adding }] =
    useAddTodoMutation()
  const [updateTodo, { isLoading: updating }] =
    useUpdateTodoMutation()

  useEffect(() => {
    if (editing)
      setForm({
        title: editing.title || "",
        description: editing.description || "",
      })
  }, [editing])

  const reset = () => {
    setForm({ title: "", description: "" })
    setEditing(null)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert("Title required")
    try {
      if (editing) {
        await updateTodo({
          id: editing._id,
          ...form,
        }).unwrap()
        reset()
      } else {
        await addTodo(form).unwrap()
        setForm({ title: "", description: "" })
      }
    } catch (err) {
      console.error(err)
      alert("Error saving")
    }
  }

  return (
    <div className="card todo-form">
      <form onSubmit={submit}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Title *"
            value={form.title}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                title: e.target.value,
              }))
            }
            style={{ flex: 1, padding: 8 }}
          />
          <select
            style={{ width: 150, padding: 8 }}
            value={editing?.status || "Pending"}
            onChange={(e) => {
              if (editing)
                setForm((s) => ({
                  ...s,
                  status: e.target.value,
                }))
            }}
            disabled={!editing}
          >
            <option>Pending</option>
            <option>In-Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              description: e.target.value,
            }))
          }
          style={{
            width: "100%",
            marginTop: 8,
            padding: 8,
          }}
        />
        <div
          style={{ marginTop: 8, display: "flex", gap: 8 }}
        >
          <button
            className="btn"
            type="submit"
            disabled={adding || updating}
          >
            {editing
              ? updating
                ? "Updating..."
                : "Update Todo"
              : adding
              ? "Adding..."
              : "Add Todo"}
          </button>
          {editing && (
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setEditing(null)
                setForm({ title: "", description: "" })
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
