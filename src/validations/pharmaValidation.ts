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
    amount: Joi.string().trim().required(),
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
    amount: Joi.string().trim().required(),
    status: Joi.string().valid(...Status).required(),
  }),
};
