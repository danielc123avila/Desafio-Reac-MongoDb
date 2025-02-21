import { precioEspecialService } from '../services/preciosEspeciales.service.js';

export const precioEspecialController = {
  // Asignar precio a usuario
  asignarPrecio: async (req, res) => {
    try {
      const { usuarioEmail, productoNombre, precio } = req.body; // Cambiar parámetros
      const resultado = await precioEspecialService.asignarPrecio(
        usuarioEmail,
        productoNombre, 
        precio
      );
      console.log('Resultado:', resultado);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Error al asignar precio:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener todos
  obtenerTodos: async (req, res) => {
    try {
      console.log('Obtener Todos');
      const precios = await precioEspecialService.obtenerTodos();
      console.log('Precios:', precios);
      res.json(precios);
    } catch (error) {
      console.error('Error al obtener todos:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por ID
  obtenerPorId: async (req, res) => {
    try {
      console.log('Obtener por ID:', req.params.id);
      const precio = await precioEspecialService.obtenerPorId(req.params.id);
      console.log('Precio:', precio);
      res.json(precio);
    } catch (error) {
      console.error('Error al obtener por ID:', error);
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  },

  // Actualizar
  actualizar: async (req, res) => {
    try {
      console.log('Actualizar:', req.params.id, req.body);
      const actualizado = await precioEspecialService.actualizar(
        req.params.id,
        req.body
      );
      console.log('Actualizado:', actualizado);
      res.json(actualizado);
    } catch (error) {
      console.error('Error al actualizar:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar
  eliminar: async (req, res) => {
    try {
      console.log('Eliminar:', req.params.id);
      await precioEspecialService.eliminar(req.params.id);
      console.log('Registro eliminado correctamente');
      res.json({ mensaje: 'Registro eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
