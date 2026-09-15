import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/db.js';
import { seedDatabase } from '../backend/src/seed.js';

let isInitialized = false;

export default async function handler(req, res) {
  if (!isInitialized) {
    try {
      await connectDB();
      await seedDatabase();
      isInitialized = true;
    } catch (err) {
      console.error('Initialization error in Vercel handler:', err);
    }
  }
  return app(req, res);
}
