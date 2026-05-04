import { Joi, Segments } from "celebrate";

export const getDataSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(5),
    search: Joi.string().trim().allow('')
  })
};
