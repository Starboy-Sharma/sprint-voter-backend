const Joi = require('joi')

const addTeamMembers = Joi.object({
    teamId: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required(),
})

module.exports = {
    addTeamMembers,
}
