import { model, Schema } from 'mongoose';
import type { incomeExpens } from '../@types/pharma.js';
const incomeExpensSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    amount: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IncomeExpens = model<incomeExpens>('IncomeExpens', incomeExpensSchema, 'incomeExpenses');

