const jwt = require('jsonwebtoken')

const secretKey = 'DARK_FLAME_MASTER'

function generateToken(payLoad) {
    return new Promise((resolve, reject) => {
        // sign the token by JWT
        jwt.sign(
            payLoad,
            secretKey,
            { expiresIn: payLoad.expiresIn },
            (error, token) => {
                if (error) {
                    console.error('Error in generateToken', error)
                    reject(error)
                }

                resolve(token)
            }
        )
    })
}

module.exports = generateToken
