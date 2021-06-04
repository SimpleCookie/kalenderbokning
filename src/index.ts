import { app } from "./app"

const port = 3003

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`)
})