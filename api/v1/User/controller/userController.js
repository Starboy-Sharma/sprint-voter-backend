const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UsersModel = require('../../../../models/users.model')
const TeamsModel = require('../../../../models/teams.model')
const response = require('../../../../resonse/response')
const generateToken = require('../../../../jwt/generateToken')

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
                delete user.password

                // const userTeams = await TeamsModel.find({
                //     'members.userId': { $in: user.id },
                // })

                // ? For User Teams create one more end point.
                const userTeams = await TeamsModel.aggregate([
                    {
                        $match: {
                            status: 'active',
                            'members.userId': mongoose.Types.ObjectId(user.id),
                        },
                    },

                    {
                        $unwind: {
                            path: '$members',
                            preserveNullAndEmptyArrays: false,
                        },
                    },

                    {
                        $lookup: {
                            from: 'users',
                            let: { userId: '$members.userId' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$_id', '$$userId'],
                                        },
                                        status: 'active',
                                    },
                                },

                                {
                                    $project: {
                                        name: 1,
                                        username: 1,
                                        role: 1,
                                        avatarUrl: 1,
                                        isAvatarSelected: 1,
                                        email: 1,
                                        _id: 0,
                                        id: '$_id',
                                    },
                                },
                            ],
                            as: 'member',
                        },
                    },

                    {
                        $unwind: {
                            path: '$member',
                            preserveNullAndEmptyArrays: false,
                        },
                    },

                    {
                        $group: {
                            _id: '$_id',
                            member: { $push: '$member' },
                            teamName: { $first: '$teamName' },
                            companyName: { $first: '$companyName' },
                            userId: { $first: '$userId' },
                        },
                    },

                    {
                        $project: {
                            _id: 1,
                            teamId: '$teamId',
                            teamName: '$name',
                            members: '$member',
                            companyName: 1,
                            userId: 1,
                        },
                    },
                ])

                const accessToken = await generateToken({
                    userId: user.id,
                    expiresIn: '15d',
                    role: user.role,
                })

                const result = {
                    accessToken,
                    profile: user,
                    teams: userTeams,
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
                role: postData.role,
                name: postData.name,
            }
            let team = {}

            // check if email is already in use
            const isEmailExists = await UsersModel.findOne({
                email: postData.email,
            })

            const isUsernameExists = await UsersModel.findOne({
                username: postData.username,
            })

            if (isUsernameExists) {
                response.sendError(
                    { errorCode: 'usernameExists', error: '' },
                    res,
                    400
                )
                return
            }

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
            if (postData.role === 'team-manager') {
                const teamData = {
                    name: postData.teamName,
                    companyName: postData.companyName,
                }

                const isTeamNameTaken = await TeamsModel.findOne({
                    name: { $regex: '^' + teamData.name + '$', $options: 'i' },
                })

                if (isTeamNameTaken) {
                    response.sendError(
                        { errorCode: 'teamNameExists', error: '' },
                        res,
                        400
                    )
                    return
                }

                teamData.userId = user.id
                teamData.members = [
                    {
                        userId: mongoose.Types.ObjectId(user.id),
                    },
                ]
                const teamObj = new TeamsModel(teamData)
                team = await teamObj.save()
                team = team.toJSON()
            }

            const result = {
                email: user.email,
                companyName: team.companyName || '',
                role: postData.role,
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
