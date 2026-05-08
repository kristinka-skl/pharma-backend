import { model, Schema } from 'mongoose';
const supplierSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    suppliers: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
supplierSchema.index({ name: "text" }, {
    name: "NameTextIndex",
    default_language: "english",
  });
export const Supplier = model('Supplier', supplierSchema);

