import { Router } from 'express';
import { 
  crearProducto,
  obtenerTodosLosProductos,
  actualizarProducto,
  eliminarProducto 
} from '../controllers/productos.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas (sin autenticación)
router.get('/public/productos', obtenerTodosLosProductos);

// Rutas protegidas (requieren JWT)

router.post('/productos', crearProducto);
router.get('/productos', obtenerTodosLosProductos);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
