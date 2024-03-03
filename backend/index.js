const connectToMongo = require('./db.js');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/emp', require('./empRoutes.js'))


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})