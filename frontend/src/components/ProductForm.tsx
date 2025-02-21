import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createProduct } from '../api/api';
import toast from 'react-hot-toast';

const ProductForm = ({ onProductCreated }: { onProductCreated: () => void }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    precioBase: '',
    sku: '',
    categoria: 'electronica'
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        ...formData,
        precioBase: Number(formData.precioBase)
      }, token!);
      
      toast.success('Producto creado correctamente');
      onProductCreated();
      setFormData({
        nombre: '',
        precioBase: '',
        sku: '',
        categoria: 'electronica'
      });
    } catch (error) {
      toast.error('Error al crear el producto');
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Base</label>
          <input
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.precioBase}
            onChange={(e) => setFormData({...formData, precioBase: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
          >
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;