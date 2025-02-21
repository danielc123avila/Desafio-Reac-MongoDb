// src/types.ts

// Actualiza la interfaz Usuario/User para incluir nombre y email
export interface User {
  id?: string;
  _id?: string;
  nombre: string;
  email: string;
}

// Interfaz para los productos
export interface Product {
  id?: string;
  _id?: string;
  nombre: string;
  precioBase: number;
}

// Actualiza la interfaz FormData para que use los campos correctos
export interface FormData {
  usuarioEmail: string;
  productoNombre: string;
  precio: string;
}

// Si necesitas mantener la interfaz original para otras partes de la aplicación
export interface LegacyFormData {
  usuarioId: string;
  productoId: string;
  precio: string;
}