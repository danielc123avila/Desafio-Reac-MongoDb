import * as productoService from '../services/productos.service.js';

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await productoService.crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerTodosLosProductos = async (req, res) => {
    try {
      const productos = await productoService.obtenerTodosLosProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error obteniendo todos los productos' });
    }
  }

export const obtenerProductoPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await productoService.obtenerProductoPorId(id);
      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error obteniendo el producto por ID' });
    }
  }

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
