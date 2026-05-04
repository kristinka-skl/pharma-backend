import type {
  Request,
  Response,
  // NextFunction
} from 'express';
import { Order } from '../models/order.js';
import { Customer } from '../models/customer.js';

interface GetQuery {
  page: number;
  perPage: number;
  search?: string;
}

type TypedRequest = Request & { query: GetQuery };

export const getOrders = async (
  req: TypedRequest,
  res: Response,
  // next: NextFunction,
) => {
  const { page, perPage, search } = req.query;

  const skip = (page - 1) * perPage;

  const ordersQuery = Order
    .find
    // { userId: req.user._id }
    ();

  if (search) {
    ordersQuery.where({ $text: { $search: search } });
  }

  const [totalOrders, orders] = await Promise.all([
    ordersQuery.clone().countDocuments(),
    ordersQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalOrders / perPage);

  res.status(200).json({
    page,
    perPage,
    totalOrders,
    totalPages,
    orders,
  });
};

export const getCustomers = async (req: TypedRequest, res: Response) => {
  const { page, perPage, search } = req.query;

  const skip = (page - 1) * perPage;

  const ordersQuery = Customer
    .find
    // { userId: req.user._id }
    ();

  if (search) {
    ordersQuery.where({ $text: { $search: search } });
  }

  const [totalCustomers, customers] = await Promise.all([
    ordersQuery.clone().countDocuments(),
    ordersQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalCustomers / perPage);

  res.status(200).json({
    page,
    perPage,
    totalCustomers,
    totalPages,
    customers,
  });
};
