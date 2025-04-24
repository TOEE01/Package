import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect  } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuario";
import Acerca from "./pages/Acerca";
import Login from "./pages/Login";
import Producto from "./pages/Producto";
import Movimiento from "./pages/Movimiento";
import EditarMovimiento from "./pages/EditarMovimiento";
import EditarProducto from "./pages/EditarProducto";
import EditarUsuario from "./pages/EditarUsuario";
import CrearNuevoUsuario from "./pages/CrearNuevoUsuario";
import CrearNuevoProducto from "./pages/CrearNuevoProducto";
import CrearNuevoMovimiento from "./pages/CrearNuevoMovimiento";

export default function App() {
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está logueado usando localStorage
    const userLoggedIn = localStorage.getItem('logueado') === 'true'; // Asegúrate de que el valor sea una cadena 'true' o 'false'
    setLogueado(userLoggedIn);
  }, []);

  const RutaPrivada = ({ children }) => {
    return logueado ? children : <Navigate to="/home" />;
  };

  return (
    <Router>
      {logueado && <Navbar setLogueado={setLogueado}/>}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setLogueado={setLogueado} />} />

          <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
          <Route path="/usuarios" element={<RutaPrivada><Usuarios /></RutaPrivada>} />
          <Route path="/acerca" element={<RutaPrivada><Acerca /></RutaPrivada>} />
          <Route path="/productos" element={<RutaPrivada><Producto /></RutaPrivada>} />
          <Route path="/movimientos" element={<RutaPrivada><Movimiento /></RutaPrivada>} />

          <Route path="/movimientos/editar/:id" element={<RutaPrivada><EditarMovimiento /></RutaPrivada>} />
          <Route path="/productos/editar/:id" element={<RutaPrivada><EditarProducto /></RutaPrivada>} />
          <Route path="/usuarios/editar/:id" element={<RutaPrivada><EditarUsuario /></RutaPrivada>} />

          <Route path="/usuarios/crear" element={<CrearNuevoUsuario />} />
          <Route path="/productos/crear" element={<RutaPrivada><CrearNuevoProducto /></RutaPrivada>} />
          <Route path="/movimientos/crear" element={<RutaPrivada><CrearNuevoMovimiento /></RutaPrivada>} />
        </Routes>
      </div>
    </Router>
  );
}
