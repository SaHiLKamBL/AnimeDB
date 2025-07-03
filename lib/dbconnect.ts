import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('✅ Already connected to database');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL as string);

    connection.isConnected = db.connections[0].readyState;
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
}

export default dbConnect;
