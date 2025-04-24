import { useState, } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // íconos del menú

const Navbar = ({ setLogueado }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("logueado");
    setLogueado(false);
    window.location.href = "/login";
  };



  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo o título */}
          <div className="text-xl font-bold">Mi App</div>

          {/* Botón menú hamburguesa (mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menú de navegación */}
          <ul className="hidden md:flex gap-6 items-center">
            <li><Link to="/home" className="hover:underline">Inicio</Link></li>
            
            <li><Link to="/usuarios" className="hover:underline">Usuarios</Link></li>
            <li><Link to="/productos" className="hover:underline">Productos</Link></li>
            <li><Link to="/movimientos" className="hover:underline">Movimientos</Link></li>
            <li>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú colapsable en mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li><Link to="/home" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            
            <li><Link to="/usuarios" onClick={() => setIsOpen(false)}>Usuarios</Link></li>
            <li><Link to="/productos" onClick={() => setIsOpen(false)}>Productos</Link></li>
            <li><Link to="/movimientos" onClick={() => setIsOpen(false)}>Movimientos</Link></li>
            <li>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;