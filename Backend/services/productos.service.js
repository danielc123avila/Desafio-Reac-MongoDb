import Producto from '../models/Producto.js';
import PrecioEspecial from '../models/PrecioEspecial.js';

export const crearProducto = async (productoData) => {
  const producto = new Producto(productoData);
  return await producto.save();
};

export const obtenerTodosLosProductos = async () => {
  try {
    const productos = await Producto.find();
    return productos;
  } catch (error) {
    throw new Error('Error obteniendo todos los productos');
  }
}

export const obtenerProductoPorId = async (id) => {
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  } catch (error) {
    throw new Error('Error obteniendo el producto por ID');
  }
}

export const actualizarProducto = async (id, updateData) => {
  return await Producto.findByIdAndUpdate(id, updateData, { new: true });
};

export const eliminarProducto = async (id) => {
  await Producto.findByIdAndDelete(id);
};
