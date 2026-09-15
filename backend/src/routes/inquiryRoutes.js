import express from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(upload.single('referenceImage'), createInquiry)
  .get(protect, getInquiries);

router.route('/:id')
  .get(protect, getInquiryById)
  .put(protect, updateInquiry)
  .delete(protect, deleteInquiry);

export default router;
