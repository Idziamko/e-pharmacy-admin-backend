import { Joi, Segments } from 'celebrate';
import { SUPPLIER_STATUSES } from '../constants/index.js';

const supplierBody = {
  name: Joi.string().trim().min(2).max(60),
  address: Joi.string().trim().min(2).max(100),
  company: Joi.string().trim().min(2).max(60),
  deliveryDate: Joi.date(),
  amount: Joi.number().positive().precision(2),
  status: Joi.string().valid(...SUPPLIER_STATUSES),
};

export const createSupplierSchema = {
  [Segments.BODY]: Joi.object({
    name: supplierBody.name.required(),
    address: supplierBody.address.required(),
    company: supplierBody.company.required(),
    deliveryDate: supplierBody.deliveryDate.required(),
    amount: supplierBody.amount.required(),
    status: supplierBody.status.required(),
  }),
};

export const updateSupplierSchema = {
  [Segments.BODY]: Joi.object(supplierBody).min(1),
};
