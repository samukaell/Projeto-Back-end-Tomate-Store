import joi from 'joi';

const getUserSchema = joi.object({
    email: joi.string().required()
});

export default getUserSchema;