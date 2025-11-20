import React, { useState, useEffect } from "react"
import { useGetTodosQuery } from "../../slices/todoApiSlice.jsx"
import TodoItem from "./TodoItem"
import Pagination from "./Pagination"

export default function TodoList({
  setEditing,
  statusFilter,
}) {
  const [page, setPage] = useState(1)
  const limit = 6

  const { data, isLoading, isFetching, error, refetch } =
    useGetTodosQuery({
      page,
      limit,
      status: statusFilter || undefined,
    })

  useEffect(() => {
    setPage(1)
  }, [statusFilter])

  if (isLoading)
    return (
      <div className="loading card">Loading todos...</div>
    )
  if (error)
    return <div className="card">Error loading todos</div>

  const todos = data?.data || []
  const meta = data?.meta

  return (
    <div className="todo-list">
      {isFetching && (
        <div className="loading card">Refreshing...</div>
      )}
      {todos.length === 0 ? (
        <div className="card">No todos found</div>
      ) : (
        todos.map((t) => (
          <TodoItem
            key={t._id}
            todo={t}
            onEdit={setEditing}
          />
        ))
      )}
      <Pagination
        meta={meta}
        onPage={(p) =>
          setPage(Math.max(1, Math.min(meta.pages || 1, p)))
        }
      />
    </div>
  )
}
