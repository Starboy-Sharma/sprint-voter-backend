const Joi = require('joi')

const login = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(8).trim(),
})

const signup = Joi.object({
    email: Joi.string().required().email().trim(),
    username: Joi.string().required().min(3).trim(),
    name: Joi.string().required().min(3).trim(),
    password: Joi.string().required().min(8).trim(),
    teamName: Joi.string().optional().allow(''),
    companyName: Joi.string().optional().allow(''),
    role: Joi.string().valid('team-member', 'team-manager').required(),
})

module.exports = {
    login,
    signup,
}
