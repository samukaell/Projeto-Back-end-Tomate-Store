import joi from 'joi';

const commentSchema = joi.object({
  commit: joi.string().required(),
});

export default commentSchema;