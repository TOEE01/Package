import { useState } from "react";
import { postProducto } from "../services/Producto";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    stock: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProducto(producto);
      alert("Producto creado exitosamente");
      navigate("/productos");
    } catch (error) {
      alert("Error al crear el producto",error);
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Producto</h2>
      <div className="border border-gray-300 rounded-xl shadow-md p-6 bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nombre */}
          <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block mb-1 font-semibold">Descripción</label>
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
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block mb-1 font-semibold">Precio</label>
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
              className="border rounded p-2 w-full"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Cantidad */}
          <div>
            <label className="block mb-1 font-semibold">Cantidad</label>
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
              className="border rounded p-2 w-full"
              required
              min="0"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-semibold">Stock</label>
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
              className="border rounded p-2 w-full"
              required
              min="0"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block mb-1 font-semibold">Categoría</label>
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
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
