const { mongoose } = require('mongoose')
const response = require('../../../../resonse/response')
const teamModel = require('../../../../models/teams.model')

class Member {
    static async addMembers(req, res) {
        try {
            let { userIds } = req.body
            const { teamId } = req.body
            let result = {}
            const userData = []

            if (req.data.role !== 'team-manager') {
                response.sendError({ errorCode: 'auth', error: '' }, res, 401)
                return
            }

            // make userIds unique
            userIds = [...new Set(userIds)]

            // userIds should not contain the login userId
            if (userIds.includes(req.data.profileId)) {
                response.sendError(
                    { errorCode: 'apiStatus', error: '' },
                    res,
                    400
                )
                return
            }

            await Promise.all(
                userIds.map(async (id) => {
                    const isAlreadyMember = await teamModel.findOne({
                        _id: mongoose.Types.ObjectId(teamId),
                        'members.userId': mongoose.Types.ObjectId(id),
                    })

                    if (!isAlreadyMember) {
                        const memberData = {
                            userId: id,
                            role: 'team-member',
                        }

                        userData.push(memberData)
                    }
                })
            )

            if (userData.length > 0) {
                result = await teamModel.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(teamId) },
                    {
                        $addToSet: { members: { $each: userData } },
                    },
                    { new: true }
                )
            }

            response.sendSuccess(
                {
                    result: {
                        data: result,
                        successCode: 'apiStatus',
                    },
                },
                res,
                200
            )
        } catch (err) {
            console.log('Add member error: ', err.message)

            response.sendError(
                { errorCode: 'serverError', error: err },
                res,
                500
            )
        }
    }
}

module.exports = Member
