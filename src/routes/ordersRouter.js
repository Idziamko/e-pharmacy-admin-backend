import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getOrders } from '../controllers/ordersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { listQuerySchema } from '../validation/listValidation.js';

const router = Router();

router.get('/', authenticate, celebrate(listQuerySchema), getOrders);

export default router;
