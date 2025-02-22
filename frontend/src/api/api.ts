// api.ts
const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async (token: string) => {
  const response = await fetch(`${API_URL}/productos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const createProduct = async (productData: any, token: string) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return response.json();
};

export const assignSpecialPrice = async (data: any, token: string) => {
  const response = await fetch(`${API_URL}/asignar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

// Nueva función para obtener todos los precios especiales
export const fetchSpecialPrices = async (token: string) => {
  const response = await fetch(`${API_URL}/obtenerPrecioEspecial`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};