import cookieParser from "cookie-parser"
import cors from "cors"
import express, { Application } from "express"
import helmet from "helmet"
import { router } from "./routes"
/**
 * Todo: Use express-session instead of cookie-parser?
 * https://www.npmjs.com/package/express-session
 */

const baseUrl = "/api"

export const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(baseUrl, router)


