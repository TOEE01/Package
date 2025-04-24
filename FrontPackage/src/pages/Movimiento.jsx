import { useEffect, useState } from "react";
import { getMovimiento } from "../services/Api";
import { eliminarMovimiento as eliminarMovimientoAPI } from "../services/Movimiento";
import { useNavigate } from "react-router-dom";

const Movimiento = () => {
const [movimiento, setmovimiento] = useState([]);
const Rol = localStorage.getItem("rol");

const cargarMovimientos = () => {
    getMovimiento().then((data) => setmovimiento(data));
};

const navigate = useNavigate();

useEffect(() => {
    getMovimiento().then((data) => setmovimiento(data));

    const movi = JSON.parse(localStorage.getItem("movimiento"));
    if (movi && movi.rol) {
      setmovimiento(movi);
      
    }
}, []);



const eliminarMovimiento = async (id) => {
    const confirmacion = window.confirm(`¿Seguro que quieres eliminar el movimiento con ID ${id}?`);
    if (confirmacion) {
    try {
        await eliminarMovimientoAPI(id); 
        alert("Movimiento eliminado con éxito");
        cargarMovimientos(); 
    } catch (error) {
        alert("Hubo un error al eliminar el movimiento",error);
    }
    }
};
return (
    <div className="p-5">
    <h1 className="text-2xl font-bold">Lista de Movimientos</h1>
    
    <button
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    onClick={() => navigate("/movimientos/crear")}
    >
    Agregar Movimiento
    </button>
    {movimiento.length === 0 ? (
        <p>No hay movimientos registrados.</p>
    ) : (
        <table className="border-collapse border border-gray-300 w-full mt-4">
        <thead>
            <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Nombre Producto</th>
            <th className="border border-gray-300 px-4 py-2">Tipo Movimiento</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Usuario_id</th>
            <th className="border border-gray-300 px-4 py-2">Nombre Usuario</th>
            {Rol !== "2"&&(
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
            )}
            </tr>
        </thead>
        <tbody>
        {movimiento.map((mov) => (
    <tr key={mov.id}>
    <td className="border border-gray-300 px-4 py-2">{mov.id}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.producto?.id}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.producto?.nombre}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.tipo}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.cantidad}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.fecha}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.usuario?.id}</td>
    <td className="border border-gray-300 px-4 py-2">{mov.usuario?.nombre}</td>
    {Rol !== "2"&&(
    <td px-2 py-2>
    <button
        onClick={() => navigate(`/movimientos/editar/${mov.id}`)}
        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 ml-2">
    Actualizar
    </button>
        <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => eliminarMovimiento(mov.id)}
        >
        Eliminar
        </button>
        </td>)}
    </tr>
        ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default Movimiento;