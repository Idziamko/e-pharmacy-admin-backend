import { model, Schema } from 'mongoose';
import { TRANSACTION_TYPES } from '../constants/index.js';

const transactionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: TRANSACTION_TYPES, required: true },
    email: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

export const Transaction = model('Transaction', transactionSchema);
