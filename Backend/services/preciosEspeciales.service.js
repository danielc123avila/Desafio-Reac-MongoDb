import PrecioEspecial from '../models/PrecioEspecial.js';

export const crearPrecioEspecial = async (precioData) => {
  try {
    const nuevoPrecio = new PrecioEspecial(precioData);
    return await nuevoPrecio.save();
  } catch (error) {
    throw new Error(`Error al crear precio especial: ${error.message}`);
  }
};

export const obtenerPreciosUsuario = async (usuarioId) => {
  try {
    return await PrecioEspecial.find({ usuarioId })
      .populate('productoId', 'nombre precioBase sku')
      .populate('metadata.creadoPor', 'nombre email')
      .lean();
  } catch (error) {
    throw new Error(`Error al obtener precios: ${error.message}`);
  }
};

export const actualizarPrecio = async (precioId, updateData) => {
  try {
    return await PrecioEspecial.findByIdAndUpdate(
      precioId,
      {
        ...updateData,
        'metadata.ultimaModificacion': Date.now()
      },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error(`Error al actualizar precio: ${error.message}`);
  }
};
