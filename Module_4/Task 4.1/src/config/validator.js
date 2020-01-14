import Joi from 'joi';

const userSchema = Joi.object().keys({
    id: Joi.number()
        .integer()
        .min(0),
    login: Joi.string()
        .alphanum()
        .min(4)
        .max(15)
        .required(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{4,15}$/)
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
        .required(),
    isDeleted: Joi.boolean()
});

export default userSchema;
