import mongoose from 'mongoose';

const precioEspecialSchema = new mongoose.Schema({
  usuario: { 
    type: String,
    required: [true, 'Email de usuario requerido'],
    index: true,
    match: [/\S+@\S+\.\S+/, 'Formato de email inválido']
  },
  producto: {  
    type: String,
    required: [true, 'Nombre de producto requerido'],
    index: true,
    maxlength: [100, 'Máximo 100 caracteres para el nombre']
  },
  precio: {
    type: Number,
    required: [true, 'Precio especial requerido'],
    min: [0.01, 'El precio mínimo es 0.01']
  },
  vigencia: {
    inicio: {
      type: Date,
      required: true,
      default: Date.now
    },
    fin: {
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value > this.vigencia.inicio;
        },
        message: 'Fecha fin debe ser posterior al inicio'
      }
    }
  },
  historial: [{
    precioAnterior: Number,
    modificadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    fechaModificacion: {
      type: Date,
      default: Date.now
    }
  }]
}, { 
  timestamps: true,
  collection: 'preciosEspecialesColina24' 
});

// Índice único compuesto
precioEspecialSchema.index({ usuario: 1, producto: 1 }, { unique: true });

// Middleware para registro histórico
precioEspecialSchema.pre('save', function(next) {
  if (this.isModified('precio')) {
    this.historial.push({
      precioAnterior: this.precio,
      modificadoPor: this.constructor.currentUser // Debes setear este valor desde el middleware de autenticación
    });
  }
  next();
});

// Método de instancia
precioEspecialSchema.methods.estaVigente = function() {
  const ahora = new Date();
  return ahora >= this.vigencia.inicio && 
        (!this.vigencia.fin || ahora <= this.vigencia.fin);
};

export default mongoose.model('PrecioEspecial', precioEspecialSchema);
