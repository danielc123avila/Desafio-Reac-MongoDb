import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import PriceAssignmentForm from '../components/PriceAssignmentForm';
import { Product } from '../types';
import { fetchSpecialPrices } from '../api/api';
import { SpecialPrice } from '../types';

// Función para obtener productos con validación
const fetchProductsLocal = async (token: string): Promise<Product[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/productos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Error al obtener productos');
    
    const data = await response.json();
    const rawProducts = data.data || data;
    
    return rawProducts.map((p: any) => ({
      id: p._id || p.id,
      nombre: p.nombre || 'Sin nombre',
      precioBase: p.precioBase || p.precio_base || 0,
      descripcion: p.descripcion,
      activo: p.activo !== undefined ? p.activo : true
    }));
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [specialPrices, setSpecialPrices] = useState<SpecialPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token')!;
      
      try {
        const [productsData, specialPricesData] = await Promise.all([
          fetchProductsLocal(token),
          fetchSpecialPrices(token)
        ]);
        
        setProducts(productsData);
        setSpecialPrices(Array.isArray(specialPricesData) ? specialPricesData : []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Agrupar precios especiales con validación
  const specialPricesByUser = specialPrices.reduce((acc: Record<string, { usuario: string, precios: any[] }>, curr) => {
    const userId = curr.usuario?.id || curr.usuarioId || 'unknown';
    const product = products.find(p => p.id === curr.productoId || p._id === curr.productoId);
    
    if (!acc[userId]) {
      acc[userId] = {
        usuario: curr.usuario?.nombre || `Usuario ${userId.slice(0, 6)}`,
        precios: []
      };
    }
    
    acc[userId].precios.push({
      ...curr,
      productoNombre: product?.nombre || `Producto ${curr.productoId?.slice(0, 6)}`,
      precioBase: product?.precioBase || 0
    });
    
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Gestión de Precios</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bienvenido, <span className="font-semibold">{user?.nombre}</span></span>
              <button
                onClick={logout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegación */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['products', 'forms', 'specialPrices'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {{
                  products: 'Productos',
                  forms: 'Formularios',
                  specialPrices: 'Precios Especiales'
                }[tab]}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido dinámico */}
        {activeTab === 'forms' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Nuevo Producto</h3>
              <ProductForm onProductCreated={() => window.location.reload()} />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Asignar Precio Especial</h3>
              {products.length > 0 ? (
                <PriceAssignmentForm products={products} />
              ) : (
                <p className="text-gray-500">Cargando productos...</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white shadow rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium">Catálogo de Productos</h3>
            </div>
            
            {loading ? (
              <div className="p-4 animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded"></div>
                ))}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-indigo-600">{product.nombre}</h4>
                        <p className="text-sm text-gray-600">
                          Precio base: 
                          <span className="font-medium ml-1">
                            ${(product.precioBase || 0).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'specialPrices' && (
          <div className="bg-white shadow rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium">Precios Especiales</h3>
            </div>
            
            {loading ? (
              <div className="p-4 animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {Object.entries(specialPricesByUser).map(([userId, userData]) => (
                  <div key={userId} className="p-4 hover:bg-gray-50">
                    <h4 className="font-semibold text-indigo-600 mb-2">{userData.usuario}</h4>
                    <div className="pl-4 border-l-2 border-indigo-100">
                      {userData.precios.map((precio, idx) => (
                        <div key={idx} className="py-2 flex justify-between items-center">
                          <span className="text-sm">{precio.productoNombre}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">
                              ${(precio.precio || 0).toFixed(2)}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              {((precio.precioBase || 0) - (precio.precio || 0)).toFixed(2)} de descuento
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;