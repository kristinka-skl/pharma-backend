import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema } from '../validations/authValidation.js';
import { loginUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/user/login', celebrate(loginUserSchema), loginUser)

export default router;
