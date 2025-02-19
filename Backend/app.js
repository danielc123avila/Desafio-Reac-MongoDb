import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Config variables de entorno
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir un router
const router = express.Router();

// Ejemplo de ruta en el router
router.get("/", (req, res) => {
  res.send("Hola desde el API!");
});

// Usar el router para las rutas con "/api"
app.use("/api", router);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app
export default app;
