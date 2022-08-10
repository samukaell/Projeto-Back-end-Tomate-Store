import joi from 'joi';

const addressSchema = joi.object({
    street: joi.string().required(),
    district: joi.string().required(),
    city: joi.string().required(),
    number: joi.number().required()
});

export default addressSchema;
