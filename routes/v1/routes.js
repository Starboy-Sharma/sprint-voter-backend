const express = require('express')

const router = express.Router()

// ROUTES
router.use('/user', require('../../api/v1/User/routes/userRoutes'))

router.use('/member', require('../../api/v1/Member/routes/memberRoutes'))

module.exports = router
