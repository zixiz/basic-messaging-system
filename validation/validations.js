const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerSchema = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.string().min(5).required(),
        full_name:Joi.string().min(3).required()
    })
    return registerSchema.validate(data);
}

const loginValidation = data => {
    const loginSchema = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.string().min(5).required()
    })
    return loginSchema.validate(data);
}

const sendMessageValidation = data => {
    const loginSchema = Joi.object().keys({
        sender:Joi.number().integer().required(),
        reciver:Joi.number().integer().required(),
        message:Joi.string().required(),
        subject:Joi.string().required(),
    })
    return loginSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.sendMessageValidation = sendMessageValidation;