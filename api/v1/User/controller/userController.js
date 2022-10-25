const bcrypt = require('bcrypt')
const UsersModel = require('../../../../models/users.model')
const TeamsModel = require('../../../../models/teams.model')

const response = require('../../../../resonse/response')

class User {
    static async login(req, res) {
        try {
            const postData = req.body

            // check if email or password is not correct
            let user = await UsersModel.findOne({ email: postData.email })

            if (!user) {
                console.log('User not found')
                response.sendError(
                    { errorCode: 'loginFailed', error: '' },
                    res,
                    400
                )

                return
            }

            user = user.toJSON()

            if (user.status !== 'active') {
                response.sendError(
                    { errorCode: 'accountDisabled', error: '' },
                    res,
                    400
                )

                return
            }

            // check user password is correct or not
            const validPassword = await bcrypt.compare(
                postData.password,
                user.password
            )

            if (validPassword) {
                /**
                 * @TODO: Generate JWT token
                 */

                delete user.password

                const result = {
                    accessToken: 'FDuiyto523iulhrkjwfsacsfy2980qwoad',
                    ...user,
                }

                response.sendSuccess({ result, successCode: 'login' }, res, 200)
                return
            }

            response.sendError(
                { errorCode: 'loginFailed', error: '' },
                res,
                400
            )

            return
        } catch (err) {
            console.log('Login error: ', err.message)

            response.sendError(
                { errorCode: 'serverError', error: err },
                res,
                500
            )
        }
    }

    static async signup(req, res) {
        try {
            const postData = req.body
            const userData = {
                username: postData.username,
                email: postData.email,
                password: postData.password,
            }

            const teamData = {
                name: postData.teamName,
                companyName: postData.companyName,
                role: 'team-manager',
            }

            // check if email is already in use
            const isEmailExists = await UsersModel.findOne({
                email: postData.email,
            })

            if (isEmailExists) {
                response.sendError(
                    { errorCode: 'emailAlreadyExists', error: '' },
                    res,
                    400
                )
                return
            }

            // generate salt to hash password
            const salt = await bcrypt.genSalt(10)

            // set user password to hash password
            userData.password = await bcrypt.hash(userData.password, salt)

            const userObj = new UsersModel(userData)
            let user = await userObj.save()
            user = user.toJSON()

            // save user team
            teamData.userId = user.id
            const teamObj = new TeamsModel(teamData)
            let team = await teamObj.save()
            team = team.toJSON()

            const result = {
                email: user.email,
                companyName: team.companyName,
                role: team.role,
                username: user.username,
            }

            response.sendSuccess({ result, successCode: 'signup' }, res, 201)
        } catch (err) {
            console.log('Signup error: ', err.message)

            response.sendError(
                { errorCode: 'serverError', error: err },
                res,
                500
            )
        }
    }
}

module.exports = User
