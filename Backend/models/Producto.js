import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    index: true
  },
  precioBase: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  categoria: {
    type: String,
    enum: ['electronica', 'ropa', 'hogar'],
    required: true
  }
});

export default mongoose.model('Producto', productoSchema);
