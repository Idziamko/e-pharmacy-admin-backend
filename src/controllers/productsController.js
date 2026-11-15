import createHttpError from 'http-errors';
import { PRODUCT_CATEGORIES } from '../constants/index.js';
import { Product } from '../models/product.js';
import { buildNameFilter, buildSort } from '../utils/buildFilter.js';
import { getPagination, getPaginationData } from '../utils/getPagination.js';

export const getProducts = async (req, res) => {
  const { page, perPage, skip } = getPagination(req.query);
  const filter = buildNameFilter(req.query.name);
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const sort = buildSort(
    req.query,
    ['name', 'category', 'stock', 'suppliers', 'price'],
    { createdAt: -1 },
  );

  const [totalItems, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort(sort).skip(skip).limit(perPage),
  ]);

  res.status(200).json({
    products,
    categories: PRODUCT_CATEGORIES,
    ...getPaginationData(totalItems, page, perPage),
  });
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({ id: product._id });
};
