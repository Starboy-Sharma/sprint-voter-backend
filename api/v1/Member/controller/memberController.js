const { mongoose } = require('mongoose')
const response = require('../../../../resonse/response')
const teamModel = require('../../../../models/teams.model')
const memberService = require('../services/memberService')

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

    static async listMembers(req, res) {
        try {
            let { isMember, page, pageCount, search, key, order } = req.query
            const { teamId } = req.query
            let result = {}
            const sort = {}

            search = search || ''

            if (!page) {
                page = 1
            } else {
                page = parseInt(page, 10)
            }

            if (!pageCount) {
                pageCount = 10
            } else {
                pageCount = parseInt(pageCount, 10)
            }

            if (search) {
                search = search.trim()
            }

            // sorting
            if (!key) {
                key = 'createdAt'
            }

            if (!order) {
                order = -1
            } else if (order === 'ASC') {
                order = 1
            } else {
                order = -1
            }

            sort[key] = order

            isMember = JSON.parse(isMember.toLowerCase())

            if (req.data.role !== 'team-manager') {
                response.sendError({ errorCode: 'auth', error: '' }, res, 401)
                return
            }

            // validate teamId
            const team = await teamModel.findOne({
                _id: mongoose.Types.ObjectId(teamId),
                status: 'active',
            })

            if (!team) {
                response.sendError({ errorCode: 'auth', error: '' }, res, 401)
                return
            }

            if (isMember === false) {
                let teamMembers = await teamModel.findOne(
                    {
                        _id: mongoose.Types.ObjectId(teamId),
                    },
                    { members: 1 }
                )

                teamMembers = teamMembers.toJSON()

                const userIds = teamMembers.members.map((member) =>
                    mongoose.Types.ObjectId(member.userId)
                )

                const query = {
                    $and: [
                        {
                            $or: [
                                { email: { $regex: search, $options: 'i' } },
                                { name: { $regex: search, $options: 'i' } },
                                { username: { $regex: search, $options: 'i' } },
                            ],
                        },

                        { _id: { $nin: userIds } },
                    ],
                }

                const [memberList, count] =
                    await memberService.availableMembers({
                        query,
                        page,
                        pageCount,
                        sort,
                    })

                result = {
                    count: memberList.length > 0 ? count : 0,
                    rows: memberList,
                    page,
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
            } else {
                console.log('List team members')
            }
        } catch (err) {
            console.log('List members error: ', err.message)

            response.sendError(
                { errorCode: 'serverError', error: err },
                res,
                500
            )
        }
    }
}

module.exports = Member
