import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  try {
const mongoUri = "mongodb+srv://alihosaenhabib:asdxALIasdx@higher.qjalvv3.mongodb.net/?appName=higher";
    await mongoose.connect(mongoUri);
    logger.info('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
  logger.error('MongoDB connection failed:', error); 
  console.error(error);
  process.exit(1);
}
};
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error('MongoDB disconnection failed:', error.message);
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
