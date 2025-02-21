import PrecioEspecial from "../models/PrecioEspecial.js";

export const precioEspecialService = {
  // CREATE - Asignar precio especial
  asignarPrecio: async (usuarioEmail, productoNombre, precio) => {
    const nuevoPrecio = new PrecioEspecial({
      usuario: usuarioEmail,
      producto: productoNombre,
      precio: precio
    });
    
    return await nuevoPrecio.save();
  },

  // READ ALL - Obtener todos los precios
  async obtenerTodos() {
    return await PrecioEspecial.find().populate("usuario producto");
  },

  // READ BY ID - Obtener por ID
  async obtenerPorId(id) {
    return await PrecioEspecial.findById(id).populate("usuario producto");
  },

  // UPDATE - Actualizar precio
  async actualizar(id, nuevosDatos) {
    return await PrecioEspecial.findByIdAndUpdate(id, nuevosDatos, {
      new: true,
    }).populate("usuario producto");
  },

  // DELETE - Eliminar asignación
  async eliminar(id) {
    return await PrecioEspecial.findByIdAndDelete(id);
  },

  async encontrarUsuarioPorEmail(email) {
    return await Usuario.findOne({ email });
  },
  async encontrarProductoPorNombre(nombre) {
    return await Producto.findOne({ nombre });
  },
};
