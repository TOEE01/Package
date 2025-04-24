import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Usuarios from "./pages/Usuario.jsx";
import Productos from "./pages/Producto.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Movimiento from "./pages/Movimiento.jsx";
import EditarMovimiento from "./pages/EditarMovimiento.jsx";
import EditarProducto from "./pages/EditarProducto.jsx"
import EditarUsuario from "./pages/EditarUsuario.jsx";
import CrearNuevoUsuario from "./pages/CrearNuevoUsuario.jsx"
import CrearNuevoProducto from "./pages/CrearNuevoProducto.jsx"
import CrearNuevoMovimiento from "./pages/CrearNuevoMovimiento";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>} />
                <Route path="/home"  element={<Home />} />
                <Route path="/login" element= {<Login/>} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path= "/productos" element= {<Productos />} />
                <Route path="/movimientos" element= {<Movimiento/>} />
                <Route path="/movimientos/editar/:id" element={<EditarMovimiento />}></Route>
                <Route path="/productos/editar/:id" element={<EditarProducto />}></Route>
                <Route path="/usuarios/editar/:id" element={<EditarUsuario />}></Route>
                <Route path="/usuarios/crear" element={<CrearNuevoUsuario />} />
                <Route path="/productos/crear" element={<CrearNuevoProducto/>}></Route>
                <Route path="/movimientos/crear" element={<CrearNuevoMovimiento />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;