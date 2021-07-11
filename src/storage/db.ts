import { MongoClient } from 'mongodb'

const user = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const clusterUrl = process.env.MONGODB_URL
const dbname = process.env.MONGODB_DATABASE

const uri =
  `mongodb+srv://${user}>:${password}@${clusterUrl}?retryWrites=true&writeConcern=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
let connected = false

export async function getDatabase() {
  try {
    if (connected == false) {
      await client.connect()
      connected = true
    }
    const database = client.db(dbname)
    return database
  } catch (error) {
    console.error("Error connecting to database", error)
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}