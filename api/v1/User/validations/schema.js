const Joi = require('joi')

const login = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(8).trim(),
    role: Joi.string().valid('team-member', 'team-manager').required(),
})

const signup = Joi.object({
    email: Joi.string().required().email().trim(),
    username: Joi.string().required().min(3).trim(),
    password: Joi.string().required().min(8).trim(),
    teamName: Joi.string().required().min(3).trim(),
    companyName: Joi.string().required().min(3).trim(),
})

module.exports = {
    login,
    signup,
}
