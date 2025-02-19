import * as productoService from '../services/productos.service.js';

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await productoService.crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await productoService.obtenerProductos(req.user?._id);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await productoService.actualizarProducto(
      req.params.id,
      req.body
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    await productoService.eliminarProducto(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
