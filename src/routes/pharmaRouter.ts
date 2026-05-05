import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { addSupplier, getCustomers, getOrders, getSuppliers, updateSupplier } from '../controllers/pharmaController.js';
import { celebrate } from 'celebrate';
import { addSupplierSchema, getDataSchema, updateSupplierSchema } from '../validations/pharmaValidation.js';

const router = Router();

router.get('/api/orders', authenticate, celebrate(getDataSchema), getOrders);
router.get('/api/customers', authenticate, celebrate(getDataSchema), getCustomers);
router.get('/api/suppliers', authenticate, celebrate(getDataSchema), getSuppliers);
router.post('/api/suppliers', authenticate, celebrate(addSupplierSchema), addSupplier);
router.put('/api/suppliers/:supplierId', authenticate, celebrate(updateSupplierSchema), updateSupplier);


export default router;
