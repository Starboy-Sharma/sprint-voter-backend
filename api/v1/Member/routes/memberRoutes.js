const express = require('express')
const controller = require('../controller/memberController')
const schema = require('../validations/schema')
const schemaValidator = require('../../../../utils/validationSchema')

const { validateSchema } = schemaValidator
const { verifyUserToken } = require('../../../../middlewares/auth')

const router = express.Router()

router.post(
    '/',
    verifyUserToken,
    validateSchema(schema, 'addTeamMembers'),
    controller.addMembers
)

module.exports = router
