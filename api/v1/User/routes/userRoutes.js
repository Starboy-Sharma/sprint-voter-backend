const express = require('express')
const controller = require('../controller/userController')
const schema = require('../validations/schema')
const schemaValidator = require('../../../../utils/validationSchema')

const { validateSchema } = schemaValidator

const router = express.Router()

router.post('/login', validateSchema(schema, 'login'), controller.login)

router.post('/register', validateSchema(schema, 'signup'), controller.signup)

module.exports = router
