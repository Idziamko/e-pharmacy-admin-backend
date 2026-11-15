import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/productsController.js';
import { authenticate } from '../middleware/authenticate.js';
import { isValidId } from '../middleware/isValidId.js';
import { listQuerySchema } from '../validation/listValidation.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/productValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', celebrate(listQuerySchema), getProducts);
router.post('/', celebrate(createProductSchema), createProduct);
router.put(
  '/:productId',
  isValidId('productId'),
  celebrate(updateProductSchema),
  updateProduct,
);
router.delete('/:productId', isValidId('productId'), deleteProduct);

export default router;
