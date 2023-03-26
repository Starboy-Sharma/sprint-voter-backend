const response = require('../resonse/response')

/**
 * This method is used to validate the schema
 * @param {string} schema Your schema key
 */

module.exports = {
    validateSchema(schema, key) {
        return function (req, res, next) {
            const requestType = {
                GET: 'query',
                POST: 'body',
                PUT: 'body',
                DELETE: 'body',
            }

            const { error } = schema[key].validate(req[requestType[req.method]])
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
