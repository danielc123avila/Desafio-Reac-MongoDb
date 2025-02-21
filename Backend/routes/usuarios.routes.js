import { Router } from 'express';
import { registrarUsuario, loginUsuario, obtenerTodosLosUsuarios, obtenerUsuarioPorId} from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/usuarios', obtenerTodosLosUsuarios)
router.get('/usuarios/:id', obtenerUsuarioPorId)
export default router;
