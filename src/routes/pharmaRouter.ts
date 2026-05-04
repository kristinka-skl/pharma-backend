import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCustomers, getOrders } from '../controllers/pharmaController.js';
import { celebrate } from 'celebrate';
import { getDataSchema } from '../validations/orderValidation.js';

const router = Router();

router.get('/api/orders', authenticate, celebrate(getDataSchema), getOrders);
router.get('/api/customers', authenticate, celebrate(getDataSchema), getCustomers);

export default router;
