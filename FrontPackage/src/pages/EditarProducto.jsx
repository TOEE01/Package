import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoPorId, actualizarProducto } from "../services/Producto";

const EditarProducto = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    stock: "",
    categoria: "",
  });

  // Al cargar el componente, obtener los datos del producto
  useEffect(() => {
    getProductoPorId(id).then((data) => setProducto(data));
  }, [id]);

  // Función para manejar el cambio de campos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Validación de los datos del formulario
  const validarFormulario = () => {
    const errores = [];

    if (!producto.nombre || producto.nombre.trim() === "") {
      errores.push("El nombre del producto es obligatorio.");
    }

    if (!producto.descripcion || producto.descripcion.trim() === "") {
      errores.push("La descripción del producto es obligatoria.");
    }

    if (!producto.precio || isNaN(producto.precio) || producto.precio <= 0) {
      errores.push("El precio debe ser un número positivo.");
    }

    if (!producto.cantidad || isNaN(producto.cantidad) || producto.cantidad < 0) {
      errores.push("La cantidad debe ser un número positivo.");
    }

    if (!producto.stock || isNaN(producto.stock) || producto.stock < 0) {
      errores.push("El stock debe ser un número positivo.");
    }

    if (!producto.categoria || producto.categoria.trim() === "") {
      errores.push("La categoría es obligatoria.");
    }

    return errores;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = validarFormulario();
    if (errores.length > 0) {
      alert(errores.join("\n"));
      return;
    }

    try {
      await actualizarProducto(id, producto);
      alert("Producto actualizado con éxito");
      navigate("/productos");
    } catch (error) {
      alert("Error al actualizar el producto", error);
    }
  };

return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg max-w-xl mx-auto mt-8 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          /* solo permite letras hacentos y espacios*/
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>
          /*permite letras, comas, numeros, puntos y guiones */
        <div>
          <label className="block font-medium mb-1">Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[\w\s.,-]*$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>
            /* solo numero enteros positivos con hasta dos decimales*/
        <div>
          <label className="block font-medium mb-1">Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>
            /* solo numero enteros positivos*/
        <div>
          <label className="block font-medium mb-1">Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={producto.cantidad}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>
            /*solo numeros enteros */
        <div>
          <label className="block font-medium mb-1">Stock:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>
            /*solo letras, espacios, y tildes */
        <div>
          <label className="block font-medium mb-1">Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
