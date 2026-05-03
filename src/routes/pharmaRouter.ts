import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getOrders } from '../controllers/pharmaController.js';
import { celebrate } from 'celebrate';
import { getOrdersSchema } from '../validations/orderValidation.js';

const router = Router();

router.get('/api/orders',
  authenticate,
  celebrate(getOrdersSchema), getOrders)

export default router;
