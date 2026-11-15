import { model, Schema } from 'mongoose';
import { PRODUCT_CATEGORIES } from '../constants/index.js';

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    category: { type: String, enum: PRODUCT_CATEGORIES, required: true },
    stock: { type: Number, required: true, min: 0 },
    suppliers: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, versionKey: false },
);

export const Product = model('Product', productSchema);
