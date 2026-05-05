import { model, Schema } from 'mongoose';
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    id: {
      type: String,
      trim: true,
    },
    suppliers: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    stock: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
productSchema.index({ name: "text" }, {
    name: "NameTextIndex",
    default_language: "english",
  });
export const Product = model('Product', productSchema);

