import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getCustomerById,
  getCustomers,
} from '../controllers/customersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { isValidId } from '../middleware/isValidId.js';
import { listQuerySchema } from '../validation/listValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', celebrate(listQuerySchema), getCustomers);
router.get('/:customerId', isValidId('customerId'), getCustomerById);

export default router;
