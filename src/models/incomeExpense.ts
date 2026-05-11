import { model, Schema } from 'mongoose';
import type { IncomeExpenseType } from '../@types/pharma.js';

const incomeExpenseSchema = new Schema(
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
    amount: { type: String, required: true, default: 0 }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IncomeExpense = model<IncomeExpenseType>('IncomeExpense', incomeExpenseSchema, 'incomeExpenses');

