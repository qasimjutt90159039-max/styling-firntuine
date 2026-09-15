import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, closeDB, isConnectedToMongo } from './db.js';
import User from './models/User.js';
import Category from './models/Category.js';

const defaultCategories = [
  {
    name: 'Sofas',
    description: 'Living room seating, armchairs, and sectional couches for home relaxation.',
    status: 'active',
  },
  {
    name: 'Beds',
    description: 'Solid frames, headboards, and bedroom sleep systems.',
    status: 'active',
  },
  {
    name: 'Dining Furniture',
    description: 'Tables, dining chairs, and banquet seating setups.',
    status: 'active',
  },
  {
    name: 'Tables',
    description: 'Coffee tables, side tables, console tables, and study desks.',
    status: 'active',
  },
  {
    name: 'Chairs',
    description: 'Accent chairs, dining chairs, and ergonomic study seats.',
    status: 'active',
  },
  {
    name: 'Storage',
    description: 'Wardrobes, media units, credenzas, and shelving systems.',
    status: 'active',
  },
  {
    name: 'Office Furniture',
    description: 'Desks, executive chairs, conference tables, and office storage.',
    status: 'active',
  },
];

export const seedDatabase = async () => {
  if (!isConnectedToMongo) {
    console.log('Using persistent JSON store default seed data.');
    return;
  }

  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'stylishadmin2026';

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      const admin = new User({
        username: adminUsername,
        password: adminPassword,
        role: 'admin',
      });
      await admin.save();
      console.log(`Admin user '${adminUsername}' created in MongoDB.`);
    } else {
      console.log(`Admin user '${adminUsername}' verified in MongoDB.`);
    }

    for (const cat of defaultCategories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await Category.create(cat);
        console.log(`Category '${cat.name}' created in MongoDB.`);
      }
    }

    console.log('MongoDB initialization completed.');
  } catch (err) {
    console.error('Error during initial MongoDB seeding:', err.message);
  }
};

// If run directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await closeDB();
    process.exit(0);
  })();
}
