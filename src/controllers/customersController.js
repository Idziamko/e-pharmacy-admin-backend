import createHttpError from 'http-errors';
import { Customer } from '../models/customer.js';
import { Order } from '../models/order.js';
import { buildNameFilter, buildSort } from '../utils/buildFilter.js';
import { getPagination, getPaginationData } from '../utils/getPagination.js';

export const getCustomers = async (req, res) => {
  const { page, perPage, skip } = getPagination(req.query);
  const filter = buildNameFilter(req.query.name);
  const sort = buildSort(
    req.query,
    ['name', 'email', 'spent', 'registerDate'],
    { createdAt: 1 },
  );

  const [totalItems, customers] = await Promise.all([
    Customer.countDocuments(filter),
    Customer.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  res.status(200).json({
    customers,
    ...getPaginationData(totalItems, page, perPage),
  });
};

export const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.customerId);
  if (!customer) {
    throw createHttpError(404, 'Customer not found');
  }
  const orders = await Order.find({ name: customer.name }).sort({
    orderDate: -1,
  });

  res.status(200).json({ ...customer.toObject(), orders });
};
