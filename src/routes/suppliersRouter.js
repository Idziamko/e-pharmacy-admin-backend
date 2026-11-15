import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
} from '../controllers/suppliersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { isValidId } from '../middleware/isValidId.js';
import { listQuerySchema } from '../validation/listValidation.js';
import {
  createSupplierSchema,
  updateSupplierSchema,
} from '../validation/supplierValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', celebrate(listQuerySchema), getSuppliers);
router.post('/', celebrate(createSupplierSchema), createSupplier);
router.put(
  '/:supplierId',
  isValidId('supplierId'),
  celebrate(updateSupplierSchema),
  updateSupplier,
);

export default router;
