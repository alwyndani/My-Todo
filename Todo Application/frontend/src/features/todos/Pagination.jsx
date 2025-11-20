import React from "react"

export default function Pagination({ meta, onPage }) {
  if (!meta) return null
  const { page, pages } = meta
  return (
    <div className="pagination">
      <button
        className="btn secondary"
        onClick={() => onPage(1)}
        disabled={page === 1}
      >
        First
      </button>
      <button
        className="btn secondary"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="small">
        Page {page} / {pages}
      </div>
      <button
        className="btn secondary"
        onClick={() => onPage(page + 1)}
        disabled={page === pages}
      >
        Next
      </button>
      <button
        className="btn secondary"
        onClick={() => onPage(pages)}
        disabled={page === pages}
      >
        Last
      </button>
    </div>
  )
}
