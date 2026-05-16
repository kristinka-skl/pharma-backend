import type { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order.js';
import { Customer } from '../models/customer.js';
import { Supplier } from '../models/supplier.js';
import createHttpError from 'http-errors';
import { Product } from '../models/product.js';
import type { IncomeExpenseType, RecentCustomer } from '../@types/pharma.js';
import { IncomeExpense } from '../models/incomeExpense.js';
import { isValidObjectId } from 'mongoose';

interface GetQuery {
  page: number;
  perPage: number;
  search?: string;
}

type TypedRequest = Request & { query: GetQuery };

export const getOrders = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { customerId } = req.params;
    if (!isValidObjectId(customerId)) {
      return next(createHttpError(400, 'Invalid customer ID format'));
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(createHttpError(404, 'Customer not found'));
    }
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// export const addCustomer = async (req: TypedRequest, res: Response) => {
//   const now = new Date();
//   const formattedDate = now.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });

//   const customer = await Customer.create({
//     ...req.body,
//     register_date: formattedDate,
//     sort_date: now,
//   });

//   res.status(201).json(customer);
// };

export const getSuppliers = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, perPage, search } = req.query;

    const skip = (page - 1) * perPage;

    const suppliersQuery = Supplier
      .find
      // { userId: req.user._id }
      ();

    if (search) {
      suppliersQuery.where({ $text: { $search: search } });
    }

    const [totalSuppliers, suppliers] = await Promise.all([
      suppliersQuery.clone().countDocuments(),
      suppliersQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalSuppliers / perPage);

    res.status(200).json({
      page,
      perPage,
      totalSuppliers,
      totalPages,
      suppliers,
    });
  } catch (error) {
    next(error);
  }
};

export const addSupplier = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.create({
      ...req.body,
      // userId: req.user._id,
    });
    res.status(201).json(supplier);
  } catch (error) {
    next(
      createHttpError(
        400,
        error instanceof Error ? error.message : 'Invalid supplier data',
      ),
    );
  }
};

export const updateSupplier = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { supplierId } = req.params;
    const supplier = await Supplier.findOneAndUpdate(
      { _id: supplierId },
      req.body,
      { new: true },
    );
    if (!supplier) {
      next(createHttpError(404, 'Supplier not found'));
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, perPage, search } = req.query;

    const skip = (page - 1) * perPage;

    const productsQuery = Product
      .find
      // { userId: req.user._id }
      ();

    if (search) {
      productsQuery.where({ $text: { $search: search } });
    }
    productsQuery.sort({ createdAt: -1 });
    const [totalProduct, products] = await Promise.all([
      productsQuery.clone().countDocuments(),
      productsQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalProduct / perPage);

    res.status(200).json({
      page,
      perPage,
      totalProduct,
      totalPages,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await Product.create({
      ...req.body,
      // userId: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    next(
      createHttpError(
        400,
        error instanceof Error ? error.message : 'Invalid product data',
      ),
    );
  }
};

export const updateProduct = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      },
    );
    if (!product) {
      next(createHttpError(404, 'Product not found'));
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) {
      next(createHttpError(404, 'Product not found'));
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

interface GetDashboardResponse {
  statistics: {
    products: number;
    suppliers: number;
    customers: number;
  };
  recentCustomers: RecentCustomer[];
  incomeExpenses: IncomeExpenseType[];
}

type TypedResponse = Response<GetDashboardResponse>;

export const getDashboard = async (
  _req: Request,
  res: TypedResponse,
  next: NextFunction,
) => {
  try {
    const [
      productsCount,
      suppliersCount,
      customersCount,
      recentCustomers,
      incomeExpenses,
    ] = await Promise.all([
      Product.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
      Customer.find().sort({ sort_date: -1 }).limit(5),
      IncomeExpense.find().sort({ _id: -1 }).limit(6),
    ]);

    const statistics = {
      products: productsCount,
      suppliers: suppliersCount,
      customers: customersCount,
    };

    res.status(200).json({ statistics, recentCustomers, incomeExpenses });
  } catch (error) {
    next(error);
  }
};
