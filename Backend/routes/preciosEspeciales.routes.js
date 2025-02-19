import express from 'express';
import { precioEspecialController } from '../controllers/preciosEspeciales.controller.js';

const router = express.Router();

// CRUD Básico
router.post('/asignar', precioEspecialController.asignarPrecio);
router.get('/get', precioEspecialController.obtenerTodos);
router.get('/:id', precioEspecialController.obtenerPorId);
router.put('/:id', precioEspecialController.actualizar);
router.delete('/:id', precioEspecialController.eliminar);

export default router;