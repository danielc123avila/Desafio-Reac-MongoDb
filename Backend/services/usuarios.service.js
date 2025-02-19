import Usuario from '../models/Usuario.js';

export const crearUsuario = async (userData) => {
  return await Usuario.create(userData);
};

export const encontrarUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};
