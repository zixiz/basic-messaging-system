const Joi = require('@hapi/joi');

module.exports = async function loginValidation(data){
    const loginSchema = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.string().min(5).required()
    })
    return loginSchema.validate(data);
}