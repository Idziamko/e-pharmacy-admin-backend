import { readFile } from 'node:fs/promises';
import bcrypt from 'bcrypt';
import { Customer } from '../models/customer.js';
import { Order } from '../models/order.js';
import { Product } from '../models/product.js';
import { Supplier } from '../models/supplier.js';
import { Transaction } from '../models/transaction.js';
import { User } from '../models/user.js';
import { fixImageUrl, parseDate, parseNumber } from '../utils/parseData.js';

const readJson = async (fileName) => {
  const url = new URL(`./data/${fileName}`, import.meta.url);
  return JSON.parse(await readFile(url, 'utf-8'));
};

const withDates = (items) => {
  const start = Date.now() - items.length * 1000;
  return items.map((item, index) => ({
    ...item,
    createdAt: new Date(start + index * 1000),
  }));
};

export const seedDatabase = async () => {
  const customers = await readJson('customers.json');
  const orders = await readJson('orders.json');
  const products = await readJson('products.json');
  const suppliers = await readJson('suppliers.json');
  const transactions = await readJson('income-expenses.json');

  await Promise.all([
    Customer.deleteMany({}),
    Order.deleteMany({}),
    Product.deleteMany({}),
    Supplier.deleteMany({}),
    Transaction.deleteMany({}),
    User.deleteMany({}),
  ]);

  await Customer.insertMany(
    withDates(
      customers.map((item) => ({
        name: item.name,
        email: item.email,
        photo: fixImageUrl(item.photo ?? item.image),
        spent: parseNumber(item.spent),
        phone: item.phone,
        address: item.address,
        registerDate: parseDate(item.register_date),
      })),
    ),
  );

  await Order.insertMany(
    withDates(
      orders.map((item) => ({
        name: item.name,
        photo: fixImageUrl(item.photo),
        address: item.address,
        products: parseNumber(item.products),
        price: parseNumber(item.price),
        status: item.status,
        orderDate: parseDate(item.order_date),
      })),
    ),
  );

  await Product.insertMany(
    withDates(
      [...products].reverse().map((item) => ({
        name: item.name,
        photo: item.photo,
        category: item.category,
        stock: parseNumber(item.stock),
        suppliers: item.suppliers,
        price: parseNumber(item.price),
      })),
    ),
  );

  await Supplier.insertMany(
    withDates(
      suppliers.map((item) => ({
        name: item.name,
        address: item.address,
        company: item.suppliers,
        deliveryDate: parseDate(item.date),
        amount: parseNumber(item.amount),
        status: item.status,
      })),
    ),
  );

  await Transaction.insertMany(
    withDates(
      transactions.map((item) => ({
        name: item.name,
        amount: parseNumber(item.amount),
        type: item.type,
      })),
    ),
  );

  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await User.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password,
  });
};
