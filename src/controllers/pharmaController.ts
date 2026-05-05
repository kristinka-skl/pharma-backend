import type {
  Request,
  Response,
  NextFunction
} from 'express';
import { Order } from '../models/order.js';
import { Customer } from '../models/customer.js';
import { Supplier } from '../models/supplier.js';
import createHttpError from 'http-errors';

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

export const getSuppliers = async (req: TypedRequest, res: Response) => {
  const { page, perPage, search } = req.query;

  const skip = (page - 1) * perPage;

  const ordersQuery = Supplier
    .find
    // { userId: req.user._id }
    ();

  if (search) {
    ordersQuery.where({ $text: { $search: search } });
  }

  const [totalSuppliers, suppliers] = await Promise.all([
    ordersQuery.clone().countDocuments(),
    ordersQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalSuppliers / perPage);

  res.status(200).json({
    page,
    perPage,
    totalSuppliers,
    totalPages,
    suppliers,
  });
};

export const addSupplier = async (req: TypedRequest, res: Response) => {
  const supplier = await Supplier.create({
    ...req.body,
    // userId: req.user._id,
  });
  res.status(201).json(supplier);
}

export const updateSupplier = async (req: TypedRequest, res: Response, next: NextFunction) => {
  const { supplierId } = req.params;
  const supplier = await Supplier.findOneAndUpdate({_id: supplierId}, req.body, { new: true });
  if (!supplier) {
    next(createHttpError(404, 'Supplier not found'));
    return;
  }
  res.status(200).json(supplier);
};
