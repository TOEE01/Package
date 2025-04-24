import { useEffect, useState } from "react";
import { getUsuario, eliminarUsuario } from "../services/Usuario";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const [usuarioActual, setUsuarioActual ] = useState(null);
  const Rol = localStorage.getItem("rol");
 

  console.log("Este es el rol: " , Rol)
  useEffect(() => { 
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuario(); // Obtenemos todos los usuarios
        console.log("Datos obtenidos: ", data);
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error("La respuesta de la API no es un array de usuarios", data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    // Cargar usuario desde localStorage y guardarlo en el estado
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.rol) {
      setUsuarioActual(user);
      
    }
  
    cargarUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmacion) {
      try {
        await eliminarUsuario(id);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Hubo un error al eliminar el usuario");
      }
    }
  };



  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {Rol !== "2"&&(
      <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick= {() => navigate(`/usuarios/crear`)}
    >
      Agregar Usuario
    </button>
    )}
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
              {Rol !== "2"&&(
              <th className="border border-gray-300 px-4 py-2">Acciones</th>)}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.rol}</td>
                {Rol !== "2" &&(
                <td className="border border-gray-300 px-4 py-2 space-x-2 text-center">
                  
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => navigate(`/usuarios/editar/${user.id}`)}
                  >
                    Editar
                  </button>
                  
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleEliminarUsuario(user.id)}
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

export default Usuarios;
