import { Router } from 'express';
import { 
  crearPrecio, 
  obtenerPrecios, 
  actualizarPrecio 
} from '../controllers/preciosEspeciales.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, crearPrecio);
router.get('/usuario/:usuarioId', authMiddleware, obtenerPrecios);
router.put('/:id', authMiddleware, actualizarPrecio);

export default router;
