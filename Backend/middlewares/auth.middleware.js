import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validar formato del header
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Formato Authorization: Bearer [token]" });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de usar process.env
    
    // Obtener usuario y validar existencia
    const user = await Usuario.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Adjuntar usuario al request
    req.user = user;
    next();

  } catch (error) {
    // Manejo detallado de errores
    const message = error.name === "TokenExpiredError" 
      ? "Token expirado" 
      : "Token inválido";
    res.status(401).json({ error: message });
  }
};

export default authMiddleware;
