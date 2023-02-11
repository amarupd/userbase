const Joi = require("joi")

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const signupSchema =Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .required()
    .messages({
        "string.pattern.base":
            "Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
    })

exports.validateSignup = validator(signupSchema)