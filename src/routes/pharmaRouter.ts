import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getOrders } from '../controllers/pharmaController.js';

const router = Router();

router.get('/api/orders', authenticate, getOrders)

export default router;
