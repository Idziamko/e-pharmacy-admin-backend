import { model, Schema } from 'mongoose';
import { SUPPLIER_STATUSES } from '../constants/index.js';

const supplierSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    deliveryDate: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: SUPPLIER_STATUSES, default: 'Active' },
  },
  { timestamps: true, versionKey: false },
);

export const Supplier = model('Supplier', supplierSchema);
