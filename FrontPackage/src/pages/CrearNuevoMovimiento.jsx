import { useState } from "react";
import { postMovimiento } from "../services/Movimiento"; // Asegúrate que el servicio esté creado
import { useNavigate } from "react-router-dom";

const CrearMovimiento = () => {
  const [movimiento, setMovimiento] = useState({
    tipo: "",
    cantidad: "",
    producto_id: "",
    usuario_id: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovimiento({ ...movimiento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postMovimiento(movimiento);
      alert("Movimiento creado con éxito");
      navigate("/movimientos");
    } catch (error) {
      console.error("Error al crear el movimiento", error);
      alert("Ocurrió un error al crear el movimiento");
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Movimiento</h2>

      <div className="border border-gray-300 rounded-xl shadow-md p-6 bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Tipo de movimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo (ENTRADA o SALIDA)</label>
            <input
              type="text"
              name="tipo"
              value={movimiento.tipo}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (/^[A-Z]*$/.test(value)) {
                  handleChange({ target: { name: "tipo", value } });
                }
              }}
              placeholder="ENTRADA / SALIDA"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={movimiento.cantidad}
              onChange={handleChange}
              placeholder="Cantidad"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Producto ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID del Producto</label>
            <input
              type="number"
              name="producto_id"
              value={movimiento.producto_id}
              onChange={handleChange}
              placeholder="Producto ID"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Usuario ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID del Usuario</label>
            <input
              type="number"
              name="usuario_id"
              value={movimiento.usuario_id}
              onChange={handleChange}
              placeholder="Usuario ID"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Crear Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearMovimiento;
