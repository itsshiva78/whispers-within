import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Database connection failed:', error);
    // Do not exit the process, just throw the error so the API can handle it
    throw new Error('Database connection failed');
  }
}

export default dbConnect;
