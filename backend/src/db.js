import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stylish_furniture';
  
  try {
    // Attempt standard MongoDB connection with a 1500ms timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
      bufferCommands: false,
    });
    isConnectedToMongo = true;
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.log(`External MongoDB server not connected (${error.message}).`);
    console.log(`Stylish Furniture API running in persistent local mode (data/store.json).`);
  }
};

export const closeDB = async () => {
  if (isConnectedToMongo) {
    await mongoose.disconnect();
  }
};
