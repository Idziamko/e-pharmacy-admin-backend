import createHttpError from 'http-errors';
import { Supplier } from '../models/supplier.js';
import { buildNameFilter, buildSort } from '../utils/buildFilter.js';
import { getPagination, getPaginationData } from '../utils/getPagination.js';

export const getSuppliers = async (req, res) => {
  const { page, perPage, skip } = getPagination(req.query);
  const filter = buildNameFilter(req.query.name);
  const sort = buildSort(
    req.query,
    ['name', 'company', 'deliveryDate', 'amount', 'status'],
    { createdAt: 1 },
  );

  const [totalItems, suppliers] = await Promise.all([
    Supplier.countDocuments(filter),
    Supplier.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  res.status(200).json({
    suppliers,
    ...getPaginationData(totalItems, page, perPage),
  });
};

export const createSupplier = async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json(supplier);
};

export const updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(
    req.params.supplierId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!supplier) {
    throw createHttpError(404, 'Supplier not found');
  }
  res.status(200).json(supplier);
};
