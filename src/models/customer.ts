import { model, Schema } from 'mongoose';
import type { RecentCustomer } from '../@types/pharma.js';
const customerSchema = new Schema(
  {
    photo: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    spent: {
      type: Number,
      required: true,
      default: 0 },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    register_date: {
      type: String,
      trim: true,
    },
    sort_date: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
customerSchema.index(
  { name: 'text' },
  {
    name: 'NameTextIndex',
    default_language: 'english',
  },
);
export const Customer = model<RecentCustomer>('Customer', customerSchema);
