const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 3000

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
}) 