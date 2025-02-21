import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(userData);
      toast.success('Registro exitoso');
      navigate('/login');
    } catch (error) {
      toast.error('Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={userData.nombre}
                onChange={(e) => setUserData({...userData, nombre: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Registrarse
          </button>
          
          <div className="text-center text-sm">
            ¿Ya tienes cuenta? {' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;