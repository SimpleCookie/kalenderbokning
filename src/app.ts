import cors from "cors"
import express, { Application } from "express"
import helmet from "helmet"
import { router } from "./routes"

const app: Application = express()
const port = 3003
const baseUrl = "/api"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(baseUrl, router)

export const server = app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`)
})
