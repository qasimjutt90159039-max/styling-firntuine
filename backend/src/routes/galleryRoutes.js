import express from 'express';
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, upload.single('image'), createGalleryItem);

router.route('/:id')
  .put(protect, upload.single('image'), updateGalleryItem)
  .delete(protect, deleteGalleryItem);

export default router;
