const express = require('express')

const router = express.Router()

// ROUTES
router.use('/user', require('../../api/v1/User/routes/userRoutes'))

module.exports = router
