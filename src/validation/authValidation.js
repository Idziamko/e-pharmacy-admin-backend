import { Joi, Segments } from 'celebrate';

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).max(64).required(),
  }),
};
