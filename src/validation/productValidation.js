import { Joi, Segments } from 'celebrate';
import { PRODUCT_CATEGORIES } from '../constants/index.js';

const productBody = {
  name: Joi.string().trim().min(2).max(60),
  category: Joi.string().valid(...PRODUCT_CATEGORIES),
  stock: Joi.number().integer().min(0),
  suppliers: Joi.string().trim().min(2).max(60),
  price: Joi.number().positive().precision(2),
  photo: Joi.string().uri().allow(null, ''),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    ...productBody,
    name: productBody.name.required(),
    category: productBody.category.required(),
    stock: productBody.stock.required(),
    suppliers: productBody.suppliers.required(),
    price: productBody.price.required(),
  }),
};

export const updateProductSchema = {
  [Segments.BODY]: Joi.object(productBody).min(1),
};
