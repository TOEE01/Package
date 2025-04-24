// Importamos los hooks de React y funciones necesarias para el componente
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovimientoPorId, actualizarMovimiento } from "../services/Movimiento";

const EditarMovimiento = () => {
  // Obtenemos el parámetro `id` desde la URL
const { id } = useParams();
  // Hook para redireccionar
const navigate = useNavigate();

  // Estado inicial del formulario de movimiento
const [movimiento, setMovimiento] = useState({
    tipo: "",
    cantidad: "",
    producto_id: "",
    usuario_id: "",
});

  // Cargar los datos del movimiento desde el backend una vez que se monta el componente
useEffect(() => {
    getMovimientoPorId(id).then((data) => setMovimiento(data));
}, [id]);

  // Función que valida los datos antes de enviar el formulario
const validarFormulario = () => {
    const errores = [];

    // Validar campo tipo
    if (!movimiento.tipo || movimiento.tipo.trim() === "") {
    errores.push("El tipo de movimiento es obligatorio.");
    } else if (!/^[A-Z]+$/.test(movimiento.tipo)) {
    errores.push("El tipo de movimiento solo debe contener letras en mayúsculas.");
    }

    // Validar campo cantidad
    if (!movimiento.cantidad || isNaN(movimiento.cantidad) || movimiento.cantidad <= 0) {
    errores.push("La cantidad debe ser un número positivo.");
    }

    // Validar campo producto_id
    if (!movimiento.producto?.id || isNaN(movimiento.producto.id) || movimiento.producto.id <= 0) {
    errores.push("El ID del producto debe ser un número positivo.");
    }

    // Validar campo usuario_id
    if (!movimiento.usuario?.id || isNaN(movimiento.usuario.id) || movimiento.usuario.id <= 0) {
    errores.push("El ID del usuario debe ser un número positivo.");
    }

    return errores;
};

  // Manejar los cambios en los inputs del formulario
const handleChange = (e) => {
    const { name, value } = e.target;

    // Si es producto o usuario, se estructura como objeto anidado
    if (name === "producto_id") {
    setMovimiento({
        ...movimiento,
        producto: { id: value },
    });
    } else if (name === "usuario_id") {
    setMovimiento({
        ...movimiento,
        usuario: { id: value },
    });
    } else if (name === "tipo") {
      // Convierte a mayúsculas automáticamente
    setMovimiento({
        ...movimiento,
        [name]: value.toUpperCase(),
    });
    } else {
    setMovimiento({
        ...movimiento,
        [name]: value,
    });
    }
};

  // Función para manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario antes de continuar
    const errores = validarFormulario();
    if (errores.length > 0) {
      alert(errores.join("\n")); // Muestra los errores
    return;
    }

    try {
      // Si no hay errores, actualizar el movimiento en el backend
    await actualizarMovimiento(id, movimiento);
    alert("Movimiento actualizado con éxito");
      navigate("/movimientos"); // Redirigir a la lista
    } catch (error) {
    alert("Error al actualizar el movimiento", error);
    }
};

  // JSX: Formulario de edición del movimiento
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Movimiento</h2>
  
      <div className="border border-gray-300 rounded-xl shadow-md p-6 bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
          {/* Tipo de movimiento */}
          <div>
            <label className="block font-medium mb-1">Tipo (ENTRADA/SALIDA):</label>
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
              placeholder="Tipo (ENTRADA/SALIDA)"
              className="border rounded p-2 w-full"
            />
          </div>
  
          {/* Cantidad */}
          <div>
            <label className="block font-medium mb-1">Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={movimiento.cantidad}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]+$/.test(value)) {
                  handleChange(e);
                }
              }}
              placeholder="Cantidad"
              className="border rounded p-2 w-full"
            />
          </div>
  
          {/* Producto ID */}
          <div>
            <label className="block font-medium mb-1">ID del Producto:</label>
            <input
              type="number"
              name="producto_id"
              value={movimiento.producto?.id || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]+$/.test(value)) {
                  handleChange({ target: { name: "producto_id", value } });
                }
              }}
              placeholder="ID Producto"
              className="border rounded p-2 w-full"
            />
          </div>
  
          {/* Usuario ID */}
          <div>
            <label className="block font-medium mb-1">ID del Usuario:</label>
            <input
              type="number"
              name="usuario_id"
              value={movimiento.usuario?.id || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]+$/.test(value)) {
                  handleChange({ target: { name: "usuario_id", value } });
                }
              }}
              placeholder="ID Usuario"
              className="border rounded p-2 w-full"
            />
          </div>
  
          {/* Botón */}
          <div className="md:col-span-2 text-center">
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

export default EditarMovimiento;
