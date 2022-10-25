const Joi = require('joi')

const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    loginType: Joi.string().valid('team-member', 'team-manager'),
})

const signup = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    teamName: Joi.string().required().min(3),
    companyName: Joi.string().required().min(3),
    role: Joi.string().valid('team-member', 'team-manager'),
})

module.exports = {
    login,
    signup,
}
