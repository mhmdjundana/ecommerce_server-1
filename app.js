if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = require('./routes/')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('applistening on port:', port)
})

module.exports = app