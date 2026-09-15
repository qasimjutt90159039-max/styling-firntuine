import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, upload.array('images', 8), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, upload.array('images', 8), updateProduct)
  .delete(protect, deleteProduct);

export default router;
