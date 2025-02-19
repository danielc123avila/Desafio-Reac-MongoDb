import { Router } from 'express';
import { 
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto 
} from '../controllers/productos.controller.js';

const router = Router();

// Rutas públicas (sin autenticación)
router.get('/public/productos', obtenerProductos);

// Rutas protegidas (requieren JWT)

router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
