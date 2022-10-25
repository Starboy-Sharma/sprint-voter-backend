const express = require('express')
const controller = require('../controller/userController')
const schema = require('../validations/schema')
const schemaValidator = require('../../../../utils/validationSchema')

const { validateSchema } = schemaValidator

const router = express.Router()

router.post('/login', validateSchema(schema, 'login'), controller.login)

module.exports = router
