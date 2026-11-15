import { model, Schema } from 'mongoose';
import { ORDER_STATUSES } from '../constants/index.js';

const orderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    address: { type: String, default: '' },
    products: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ORDER_STATUSES, default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

export const Order = model('Order', orderSchema);
