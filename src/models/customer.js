import { model, Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    spent: { type: Number, default: 0 },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    registerDate: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

export const Customer = model('Customer', customerSchema);
