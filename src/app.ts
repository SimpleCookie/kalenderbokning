import express, { Application, Request, Response } from "express"
import cors from 'cors'
import helmet from 'helmet'
import { useUserControllers } from "./users"

const app: Application = express()
const port = 3003

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get("/v1/ping", async (req: Request, res: Response): Promise<Response> => res.status(200).send({
  message: "I am alive!",
}))

useUserControllers(app)


try {
  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
  })
} catch (error) {
  console.error(`Error occured: ${error.message}`)
}
