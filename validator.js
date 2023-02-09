const Joi = require("joi")

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const signupSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile_number: Joi.string().length(10).required(),
    userId: Joi.string().length(10).required(),
    password: Joi.string().min(5).max(15).required(),
    confirm_password: Joi.ref('password')
})

exports.validateSignup = validator(signupSchema)