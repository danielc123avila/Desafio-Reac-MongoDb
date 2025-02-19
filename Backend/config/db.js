import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
