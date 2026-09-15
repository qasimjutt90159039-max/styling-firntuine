import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'stylish_furniture_secret_key_2026_lahore',
    { expiresIn: '7d' }
  );
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    if (isConnectedToMongo) {
      const user = await User.findOne({ username: username.trim() });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    // Local JSON store fallback
    const user = jsonStore.findOne('users', (u) => u.username === username.trim());
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Authentication server error', error: error.message });
  }
};

// @desc    Verify current session token
// @route   GET /api/auth/verify
// @access  Private
export const verifyAuth = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Token verification failed' });
  }
};
