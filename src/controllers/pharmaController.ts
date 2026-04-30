import type { Request, Response,
  // NextFunction
} from 'express';
import { Order } from '../models/order.js';

export const getOrders = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  const { pageQuery = 1, perPageQuery = 5, search } = req.query;
  const page = Number(pageQuery);
  const perPage = Number(perPageQuery);
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
