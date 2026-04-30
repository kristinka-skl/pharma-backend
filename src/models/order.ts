import { model, Schema } from 'mongoose';
const orderSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    products: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    order_date: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
orderSchema.index({ name: "text" }, {
    name: "NameTextIndex",
    default_language: "english",
  });
export const Order = model('Order', orderSchema);

