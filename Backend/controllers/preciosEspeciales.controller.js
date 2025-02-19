import { precioEspecialService } from '../services/preciosEspeciales.service.js';

export const precioEspecialController = {
  // Asignar precio a usuario
  asignarPrecio: async (req, res) => {
    try {
      const { usuarioId, productoId, precio } = req.body;
      const resultado = await precioEspecialService.asignarPrecio(
        usuarioId,
        productoId,
        precio
      );
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener todos
  obtenerTodos: async (req, res) => {
    try {
      const precios = await precioEspecialService.obtenerTodos();
      res.json(precios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por ID
  obtenerPorId: async (req, res) => {
    try {
      const precio = await precioEspecialService.obtenerPorId(req.params.id);
      res.json(precio);
    } catch (error) {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  },

  // Actualizar
  actualizar: async (req, res) => {
    try {
      const actualizado = await precioEspecialService.actualizar(
        req.params.id,
        req.body
      );
      res.json(actualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar
  eliminar: async (req, res) => {
    try {
      await precioEspecialService.eliminar(req.params.id);
      res.json({ mensaje: 'Registro eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
