import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { addProduct, addSupplier, deleteProduct, getCustomerById, getCustomers, getDashboard, getOrders, getProducts, getSuppliers, updateProduct, updateSupplier } from '../controllers/pharmaController.js';
import { celebrate } from 'celebrate';
import { addProductSchema, addSupplierSchema, getDataSchema, productIdSchema, updateProductSchema, updateSupplierSchema } from '../validations/pharmaValidation.js';

const router = Router();

router.get('/api/dashboard', authenticate, getDashboard);

router.get('/api/orders', authenticate, celebrate(getDataSchema), getOrders);

router.get('/api/customers', authenticate, celebrate(getDataSchema), getCustomers);
router.get('/api/customers/:customerId', authenticate, getCustomerById);

router.get('/api/suppliers', authenticate, celebrate(getDataSchema), getSuppliers);
router.post('/api/suppliers', authenticate, celebrate(addSupplierSchema), addSupplier);
router.put('/api/suppliers/:supplierId', authenticate, celebrate(updateSupplierSchema), updateSupplier);

router.get('/api/products', authenticate, celebrate(getDataSchema), getProducts);
router.post('/api/products', authenticate, celebrate(addProductSchema), addProduct);
router.put('/api/products/:productId', authenticate, celebrate(updateProductSchema), updateProduct);
router.delete('/api/products/:productId', authenticate, celebrate(productIdSchema), deleteProduct);

export default router;
