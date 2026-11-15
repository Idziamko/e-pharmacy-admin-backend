import { Order } from '../models/order.js';
import { buildNameFilter, buildSort } from '../utils/buildFilter.js';
import { getPagination, getPaginationData } from '../utils/getPagination.js';

export const getOrders = async (req, res) => {
  const { page, perPage, skip } = getPagination(req.query);
  const filter = buildNameFilter(req.query.name);
  const sort = buildSort(
    req.query,
    ['name', 'products', 'price', 'status', 'orderDate'],
    { createdAt: 1 },
  );

  const [totalItems, orders] = await Promise.all([
    Order.countDocuments(filter),
    Order.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  res.status(200).json({
    orders,
    ...getPaginationData(totalItems, page, perPage),
  });
};
