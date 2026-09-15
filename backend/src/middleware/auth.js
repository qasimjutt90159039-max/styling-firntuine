import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'stylish_furniture_secret_key_2026_lahore'
      );

      if (isConnectedToMongo) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = jsonStore.findById('users', decoded.id);
        if (found) {
          const { password, ...rest } = found;
          req.user = rest;
        }
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found or authorization revoked' });
      }
      return next();
    } catch (error) {
      console.error('Auth verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
