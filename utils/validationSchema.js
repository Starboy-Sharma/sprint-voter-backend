const response = require('../resonse/response')

/**
 * This method is used to validate the schema
 * @param {string} schema Your schema key
 */

module.exports = {
    validateSchema(schema, key) {
        console.log('Running...')
        return function (req, res, next) {
            const { error } = schema[key].validate(req.body)
            const valid = error == null
            if (valid) {
                next()
            } else {
                const { details } = error
                console.log(`Error in ${key}: ${details}`)
                const message = details.map((i) => i.message).join(',')
                response.sendError(
                    { errorCode: 'validationError', error: message },
                    res,
                    400
                )
            }
        }
    },
}
