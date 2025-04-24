import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarUsuario, getUsuarioPorId } from "../services/Usuario";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "",
  });


  useEffect(() => {
    console.log("Id del useParams",id);
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioPorId(id);
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarUsuario(id, usuario);
      alert("Usuario actualizado con éxito");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Usuario</h2>
      <div className="border border-gray-300 rounded-xl shadow-md p-6 bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          
          <label className="text-sm font-semibold">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
              className="border rounded p-2 w-full mt-1"
              required
            />
          </label>

          <label className="text-sm font-semibold">
            Email:
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="border rounded p-2 w-full mt-1"
              required
            />
          </label>

          <label className="text-sm font-semibold">
            Rol:
            <input
              type="text"
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              className="border rounded p-2 w-full mt-1"
              required
            />
          </label>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;
