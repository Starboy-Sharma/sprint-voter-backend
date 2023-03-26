const Joi = require('joi')

const addTeamMembers = Joi.object({
    teamId: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required(),
})

const listAvailableMembers = Joi.object({
    teamId: Joi.string().required(),
    isMember: Joi.boolean().required(),
    page: Joi.string().required(),
    pageCount: Joi.string().required(),
    search: Joi.string().optional().allow('').trim(),
    key: Joi.string().optional().allow(''),
    order: Joi.string().optional().allow(''),
})

module.exports = {
    addTeamMembers,
    listAvailableMembers,
}
