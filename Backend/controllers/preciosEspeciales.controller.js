import * as PreciosService from '../services/preciosEspeciales.service.js';

export const crearPrecio = async (req, res) => {
  try {
    const precio = await PreciosService.crearPrecioEspecial({
      ...req.body,
      metadata: {
        creadoPor: req.usuario.id
      }
    });
    res.status(201).json(precio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerPrecios = async (req, res) => {
  try {
    const precios = await PreciosService.obtenerPreciosUsuario(req.params.usuarioId);
    res.json(precios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarPrecio = async (req, res) => {
  try {
    const precioActualizado = await PreciosService.actualizarPrecio(
      req.params.id,
      req.body
    );
    res.json(precioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
