/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const response = require('../resonse/response')

const secretKey = 'DARK_FLAME_MASTER'
const userModel = require('../models/users.model')

const verifyUserToken = (req, res, next) => {
    const token = req.headers['access.token']
    if (!token) {
        console.log('Token missing')
        return response.sendError({ error: false, errorCode: 'auth' }, res, 401)
    }

    jwt.verify(token, secretKey, async (error, decoded) => {
        if (error) {
            console.log('------------>Token ERROR', error)
            response.sendError({ error, errorCode: 'serverError' }, res, 401)
            return
        } else {
            req.data = {
                profileId: decoded.userId,
                accessToken: token,
                role: decoded.role,
            }

            // check on every request user is active or not
            const userData = await userModel.findOne({
                _id: mongoose.Types.ObjectId(req.data.profileId),
            })

            if (!userData) {
                console.log('User not found')
                response.sendError(
                    { error: 'Not found', errorCode: 'auth' },
                    res,
                    401
                )

                return
            }

            console.log('------------------>>token verified', req.data)
            next()
        }
    })
}

module.exports = {
    verifyUserToken,
}
