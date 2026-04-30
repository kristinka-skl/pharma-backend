import type { Request, Response,
  // NextFunction
} from 'express';
import { Order } from '../models/order.js';

interface GetOrdersQuery {
  page: number;
  perPage: number;
  search?: string;
}

type TypedRequest = Request & { query: GetOrdersQuery };

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
