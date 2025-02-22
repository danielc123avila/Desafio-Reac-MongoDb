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
  descripcion?: string;
  activo?: boolean;
}

export interface SpecialPrice {
  id?: string;
  _id?: string;
  usuarioId: string;
  productoId: string;
  precio: number;
  precioBase: number;
  usuario?: {
    id: string;
    nombre: string;
  };
  producto?: {
    id: string;
    nombre: string;
  };
}

export interface FormData {
  usuarioEmail: string;
  productoNombre: string;
  precio: string;
}

export interface LegacyFormData {
  usuarioId: string;
  productoId: string;
  precio: string;
}