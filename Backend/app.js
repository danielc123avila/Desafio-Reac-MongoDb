import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import preciosRoutes from "./routes/preciosEspeciales.routes.js";
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();

// Config variables de entorno
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Usar el router para las rutas con "/api"
app.use("/api", preciosRoutes);
app.use("/api", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app
export default app;
