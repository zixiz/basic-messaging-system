const Joi = require('@hapi/joi');

module.exports = async function registerValidation(data){
    const registerSchema = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.string().min(5).required(),
        full_name:Joi.string().min(3).required()
    })
    return registerSchema.validate(data);
}