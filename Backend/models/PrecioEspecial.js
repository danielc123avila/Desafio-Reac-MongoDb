import mongoose from 'mongoose';

const precioEspecialSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    index: true
  },
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
    index: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  vigencia: {
    inicio: {
      type: Date,
      required: true,
      default: Date.now
    },
    fin: Date
  },
  metadata: {
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    ultimaModificacion: {
      type: Date,
      default: Date.now
    }
  }
}, { collection: 'preciosEspecialesGomez25' });

precioEspecialSchema.index({ usuarioId: 1, productoId: 1 });

// Middleware de validación
precioEspecialSchema.pre('save', function(next) {
  if (this.vigencia.fin && this.vigencia.fin <= this.vigencia.inicio) {
    const error = new Error('Fecha fin debe ser posterior a fecha inicio');
    return next(error);
  }
  next();
});

export default mongoose.model('PrecioEspecial', precioEspecialSchema);
