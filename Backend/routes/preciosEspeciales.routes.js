import express from 'express';
import { precioEspecialController } from '../controllers/preciosEspeciales.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

// CRUD Básico
router.post('/asignar', precioEspecialController.asignarPrecio);
router.get('/obtenerPrecioEspecial',  precioEspecialController.obtenerTodos);
router.get('/obtenerPrecioEspecial/:id', precioEspecialController.obtenerPorId);
router.put('/:id', precioEspecialController.actualizar);
router.delete('/:id',  precioEspecialController.eliminar);

export default router;