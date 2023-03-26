const userModel = require('../../../../models/users.model')

class MemberService {
    static async availableMembers({ page, pageCount, query, sort }) {
        const result = await Promise.all([
            userModel
                .find(query, { password: 0 })
                .sort(sort)
                .skip(pageCount * page - pageCount)
                .limit(pageCount),

            userModel.find(query).countDocuments(),
        ])

        return result
    }
}

module.exports = MemberService
