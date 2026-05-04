import { model, Schema } from 'mongoose';
const customerSchema = new Schema(
  {
    photo: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    spent: {
      type: String,
      trim: true,
    },
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
customerSchema.index({ name: "text" }, {
    name: "NameTextIndex",
    default_language: "english",
  });
export const Customer = model('Customer', customerSchema);

