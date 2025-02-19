import Producto from '../models/Producto.js';
import PrecioEspecial from '../models/PrecioEspecial.js';

export const crearProducto = async (productoData) => {
  const producto = new Producto(productoData);
  return await producto.save();
};

export const obtenerProductos = async (userId) => {
  const productos = await Producto.find();
  
  return Promise.all(productos.map(async (producto) => {
    const precioEspecial = await PrecioEspecial.findOne({
      usuario: userId,
      producto: producto._id
    });
    
    return {
      ...producto.toObject(),
      precioFinal: precioEspecial ? precioEspecial.precio : producto.precioBase
    };
  }));
};

export const actualizarProducto = async (id, updateData) => {
  return await Producto.findByIdAndUpdate(id, updateData, { new: true });
};

export const eliminarProducto = async (id) => {
  await Producto.findByIdAndDelete(id);
};
