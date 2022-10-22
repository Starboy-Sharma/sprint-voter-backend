require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')
const sockets = require('./socket')

const app = express()
const PORT = process.env.PORT || 5000

// const DB = require('./database/connection.js');

// Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const server = http.createServer(app)
sockets.init(server)

// Start server 🚀
server.listen(PORT, () => console.log(`Server is running at ${PORT} 🚀`))
