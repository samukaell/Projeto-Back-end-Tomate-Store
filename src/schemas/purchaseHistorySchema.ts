import joi from 'joi';

const purchaseSchema = joi.object({
    amount: joi.number().required(),
    
});

export default purchaseSchema;