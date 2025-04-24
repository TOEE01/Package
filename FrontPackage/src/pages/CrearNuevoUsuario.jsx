import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUsuario } from "../services/Usuario"; // asegúrate de tener esta función en tu archivo de servicios

const CrearUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "2"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postUsuario(usuario);
      alert("Usuario creado exitosamente ");
      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al crear el usuario ");
    }
  };


  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Usuario</h2>
      <div className="border border-gray-300 rounded-xl shadow-md p-6 bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
            pattern="^[a-zA-Z\s]+$"
            placeholder="Nombre"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Correo Electrónico</label>
            <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
            placeholder="Correo Electrónico"
/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rol</label>
            <input
              type="text"
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
