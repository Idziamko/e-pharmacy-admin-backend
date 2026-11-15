import { Joi, Segments } from 'celebrate';

export const listQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1).max(100),
    name: Joi.string().trim().allow(''),
    category: Joi.string().trim().allow(''),
    sortBy: Joi.string().trim(),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};
