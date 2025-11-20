import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import TodoRouter from "./routes/TodoRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.use("/api/todos", TodoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
