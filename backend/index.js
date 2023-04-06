const connectToMongo = require ('./db.js');
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/note'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


