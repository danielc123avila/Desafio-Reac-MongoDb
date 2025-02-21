import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import PriceAssignmentForm from '../components/PriceAssignmentForm';
import { Product } from '../types';

// Add the missing fetchProducts function
const fetchProducts = async (token: string): Promise<Product[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/productos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  // Use the proper Product type
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(localStorage.getItem('token')!);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bienvenido, {user?.nombre}</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProductForm onProductCreated={() => window.location.reload()} />
          {/* Add defensive check before passing products */}
          {Array.isArray(products) ? (
            <PriceAssignmentForm products={products} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              No hay productos disponibles
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-4 border-b">Productos</h2>
          <div className="p-4">
            {loading ? (
              <p>Cargando productos...</p>
            ) : products.length > 0 ? (
              // Add defensive check before mapping products
              Array.isArray(products) && products.map(product => (
                <div key={product.id || product._id} className="border-b py-2">
                  <h3>{product.nombre}</h3>
                  <p>Precio base: ${product.precioBase}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron productos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;