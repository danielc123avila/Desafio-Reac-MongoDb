import Usuario from '../models/Usuario.js';

export const crearUsuario = async (userData) => {
  return await Usuario.create(userData);
};

export const encontrarUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

export const obtenerTodosLosUsuarios = async () => {
    try {
      const usuarios = await Usuario.find();
      return usuarios;
    } catch (error) {
      throw new Error('Error obteniendo todos los usuarios');
    }
  }

    export const obtenerUsuarioPorId = async () => {
    try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Error obteniendo el usuario por ID');
    }
  }

