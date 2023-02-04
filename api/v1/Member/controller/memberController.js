const response = require('../../../../resonse/response')

class Member {
    static async addMembers(req, res) {
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
