const response = require('../../../../resonse/response')

class Member {
    static async addMembers(req, res) {
        let { userIds } = req.body

        if (req.data.role !== 'team-manager') {
            response.sendError({ errorCode: 'auth', error: '' }, res, 401)
            return
        }

        // make userIds unique
        userIds = [...new Set(userIds)]

        // userIds should not contain the login userId
        if (userIds.includes(req.data.profileId)) {
            response.sendError({ errorCode: 'apiStatus', error: '' }, res, 400)
            return
        }

        console.log(userIds)

        // TODO Start add members database lookup code here.
        response.sendSuccess(
            {
                result: {
                    msg: 'Success Code',
                    successCode: 'apiStatus',
                },
            },
            res,
            200
        )
    }
}

module.exports = Member
