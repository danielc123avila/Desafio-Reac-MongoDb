import PrecioEspecial from '../models/PrecioEspecial.js';

export const precioEspecialService = {
  // CREATE - Asignar precio especial
  async crear(datos) {
    return await PrecioEspecial.create(datos);
  },

  // READ ALL - Obtener todos los precios
  async obtenerTodos() {
    return await PrecioEspecial.find().populate('usuario producto');
  },

  // READ BY ID - Obtener por ID
  async obtenerPorId(id) {
    return await PrecioEspecial.findById(id).populate('usuario producto');
  },

  // UPDATE - Actualizar precio
  async actualizar(id, nuevosDatos) {
    return await PrecioEspecial.findByIdAndUpdate(id, nuevosDatos, { 
      new: true 
    }).populate('usuario producto');
  },

  // DELETE - Eliminar asignación
  async eliminar(id) {
    return await PrecioEspecial.findByIdAndDelete(id);
  },

  // ASIGNAR PRECIO ESPECIAL (Método específico)
  async asignarPrecio(usuarioId, productoId, precio) {
    return this.crear({
      usuario: usuarioId,
      producto: productoId,
      precio: precio,
      vigencia: {
        inicio: new Date(),
        fin: null // Sin fecha de expiración
      }
    });
  }
};
