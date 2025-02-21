import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import * as UsuarioService from "../services/usuarios.service.js";

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error obteniendo todos los usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.obtenerUsuarioPorId(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error obteniendo el usuario por ID" });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
