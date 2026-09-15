import express from 'express';
import { login, verifyAuth } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', protect, verifyAuth);

export default router;
