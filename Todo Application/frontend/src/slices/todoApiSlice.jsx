import { apiSlice } from "./apiSlice"

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ page = 1, limit = 6, status } = {}) => {
        const params = new URLSearchParams()
        params.set("page", page)
        params.set("limit", limit)
        if (status) params.set("status", status)
        return { url: `/api/todos?${params.toString()}` }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((t) => ({
                type: "Todos",
                id: t._id,
              })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),
    getTodo: builder.query({
      query: (id) => `/api/todos/${id}`,
      providesTags: (res, err, id) => [
        { type: "Todos", id },
      ],
    }),
    addTodo: builder.mutation({
      query: (payload) => ({
        url: "/api/todos",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: "Todos", id },
        { type: "Todos", id: "LIST" },
      ],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "Todos", id },
        { type: "Todos", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice
