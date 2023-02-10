const Joi = require("joi")

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const signupSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile_number: Joi.string().length(10).required(),
    userID: Joi.string().min(5).max(15).required(),
    password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .required()
    .messages({
        "string.pattern.base":
            "Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
    }),
    confirm_password: Joi.ref('password')
})

exports.validateSignup = validator(signupSchema)