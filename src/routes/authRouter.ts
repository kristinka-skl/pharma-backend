import { celebrate } from 'celebrate';
import { Router } from 'express';
import { loginUserSchema } from '../validations/authValidation.js';
import { getCurrentUser, loginUser, logoutUser, refreshUserSession } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/api/user/login', celebrate(loginUserSchema), loginUser)
router.post('/api/user/refresh', refreshUserSession);
router.get('/api/user/logout', logoutUser);
router.get('/api/user/user-info', authenticate, getCurrentUser)

export default router;
