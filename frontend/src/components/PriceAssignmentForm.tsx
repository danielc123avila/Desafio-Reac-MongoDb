// src/components/PriceAssignmentForm.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { assignSpecialPrice } from '../api/api';
import toast from 'react-hot-toast';
import { FormData, User, Product } from '../types';

interface PriceAssignmentFormProps {
  products: Product[];
}

const PriceAssignmentForm = ({ products }: PriceAssignmentFormProps) => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    usuarioEmail: '',
    productoNombre: '',
    precio: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios/usuarios', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        const validUsers = (data.data || data).filter((user: User) => 
          user.email && /\S+@\S+\.\S+/.test(user.email)
        );
        
        setUsers(validUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error al cargar usuarios');
        setUsers([]);
      }
    };
    
    if (token) fetchUsers();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const priceValue = Number(formData.precio);
      
      if (isNaN(priceValue) || priceValue <= 0) {
        toast.error('El precio debe ser mayor a 0');
        return;
      }

      await assignSpecialPrice({
        usuarioEmail: formData.usuarioEmail,
        productoNombre: formData.productoNombre,
        precio: priceValue
      }, token!);
      
      toast.success(`Precio especial asignado:
        \n📧 Usuario: ${formData.usuarioEmail}
        \n📦 Producto: ${formData.productoNombre}
        \n💵 Precio: $${priceValue.toFixed(2)}`);
        
      setFormData({
        usuarioEmail: '',
        productoNombre: '',
        precio: ''
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al asignar precio';
      toast.error(errorMessage.includes('inválido') ? errorMessage : `❌ ${errorMessage}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        🎯 Asignación de Precios Especiales
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Seleccionar Usuario
            </label>
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.usuarioEmail}
              onChange={(e) => setFormData({...formData, usuarioEmail: e.target.value})}
              required
            >
              <option value="">-- Seleccione un usuario --</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.nombre} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🛍️ Seleccionar Producto
            </label>
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.productoNombre}
              onChange={(e) => setFormData({...formData, productoNombre: e.target.value})}
              required
            >
              <option value="">-- Seleccione un producto --</option>
              {products.map((product) => (
                <option key={product.nombre} value={product.nombre}>
                  {product.nombre} (Base: ${product.precioBase?.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💰 Precio Especial
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ejemplo: 1599.99"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z" clipRule="evenodd" />
          </svg>
          Asignar Precio
        </button>
      </form>
    </div>
  );
};

export default PriceAssignmentForm;