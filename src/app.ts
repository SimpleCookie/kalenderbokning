import cookieParser from "cookie-parser"
import cors from "cors"
import express, { Application } from "express"
import helmet from "helmet"
import { router } from "./routes"

const baseUrl = "/api"

export const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(baseUrl, router)


