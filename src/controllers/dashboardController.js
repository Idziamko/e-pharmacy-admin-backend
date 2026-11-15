import { Customer } from '../models/customer.js';
import { Product } from '../models/product.js';
import { Supplier } from '../models/supplier.js';
import { Transaction } from '../models/transaction.js';

export const getDashboard = async (req, res) => {
  const [productsCount, suppliersCount, customersCount] = await Promise.all([
    Product.countDocuments(),
    Supplier.countDocuments(),
    Customer.countDocuments(),
  ]);

  const recentCustomers = await Customer.find()
    .sort({ registerDate: -1 })
    .limit(5)
    .select('name email photo spent');

  const incomeExpenses = await Transaction.find()
    .sort({ createdAt: 1 })
    .limit(6);

  const incomeByType = await Transaction.aggregate([
    { $group: { _id: '$type', total: { $sum: { $abs: '$amount' } } } },
  ]);

  res.status(200).json({
    statistics: {
      products: productsCount,
      suppliers: suppliersCount,
      customers: customersCount,
    },
    recentCustomers,
    incomeExpenses,
    totals: incomeByType.map((item) => ({
      type: item._id,
      total: Math.round(item.total * 100) / 100,
    })),
  });
};
