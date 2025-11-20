import Todo from "../models/TodoModel.js"

const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required" })
    }
    const newTodo = await Todo.create({
      title,
      description,
      status,
    })
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    })
  }
}

const getTodos = async (req, res) => {
  try {
    const page = Math.max(
      1,
      parseInt(req.query.page || "1")
    )
    const limit = Math.max(
      1,
      parseInt(req.query.limit || "6")
    )
    const status = req.query.status // optional filter
    const filter = {}
    if (status) filter.status = status

    const skip = (page - 1) * limit
    const [total, todos] = await Promise.all([
      Todo.countDocuments(filter),
      Todo.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ])

    res.json({
      data: todos,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", err })
  }
}

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo)
      return res.status(404).json({ message: "Not found" })
    res.json(todo)
  } catch (err) {
    res.status(500).json({ message: "Server error", err })
  }
}

const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Todo not found" })
    }

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Update failed",
      error: err.message,
    })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const removed = await Todo.findByIdAndDelete(
      req.params.id
    )
    if (!removed)
      return res.status(404).json({ message: "Not found" })
    res.json({ message: "Deleted", id: req.params.id })
  } catch (err) {
    res.status(500).json({ message: "Server error", err })
  }
}

export {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
}
