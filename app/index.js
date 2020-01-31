const express = require('express')
const app = express()

const port = process.env.PORT || 8000

app.get('/status', (req, res) => {
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})