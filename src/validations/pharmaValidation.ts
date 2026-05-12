import { Joi, Segments } from 'celebrate';
import { Status } from '../constants/status.js';
import { isValidObjectId } from 'mongoose';


export const getDataSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(5),
    search: Joi.string().trim().allow(''),
  }),
};

export const addSupplierSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    suppliers: Joi.string().trim().required(),
    date: Joi.string().trim().required(),
    amount: Joi.number().required(),
    status: Joi.string().valid(...Status).required(),
  }),
};


export const supplierIdSchema = {
  [Segments.PARAMS]: Joi.object({
    supplierId: Joi.string()
      .trim()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message({ custom: 'Invalid id format' });
        }
        return value;
      })
      .required(),
  })
};

export const updateSupplierSchema = {
  ...supplierIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    suppliers: Joi.string().trim().required(),
    date: Joi.string().trim().required(),
    amount: Joi.number().required(),
    status: Joi.string().valid(...Status).required(),
  }),
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string()
      .trim()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message({ custom: 'Invalid id format' });
        }
        return value;
      })
      .required(),
  })
};

export const addProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(1000).required(),
    suppliers: Joi.string().trim().min(1).max(1000).required(),
    price: Joi.number().positive().max(10000000).required(),
    stock: Joi.number().integer().max(1000000).min(0).required(),
    category: Joi.string().trim().required(),
  }),
};


export const updateProductSchema = {
  ...productIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(1000).required(),
    suppliers: Joi.string().trim().min(1).max(1000).required(),
    price: Joi.number().positive().max(10000000).required(),
    stock: Joi.number().integer().max(1000000).min(0).required(),
    category: Joi.string().trim().required(),
  }),
};

