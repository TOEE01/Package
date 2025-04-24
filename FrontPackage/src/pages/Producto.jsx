import { useEffect, useState } from "react";
import { getProducto, eliminarProducto } from "../services/Producto";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Producto = () => {
  const [producto, setProducto] = useState([]);
  const navigate = useNavigate();
  const Rol = localStorage.getItem("rol")

  useEffect(() => {
    cargarProductos();

    const produc = JSON.parse(localStorage.getItem("producto"));
    if(produc && produc.Rol){
      setProducto(produc);
    }
  }, []);

  const cargarProductos = async () => {
    const data = await getProducto();
    setProducto(data);
  };

  const handleEliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      alert("Producto eliminado correctamente.");
      cargarProductos();
    } catch (error) {
      alert("Hubo un error al eliminar el producto.",error);
    }
  };


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Lista de productos</h1>
      
      <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={() => navigate("/productos/crear")}
    >
      Agregar Producto
    </button>
      {producto.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="border-collapse border border-gray-300 w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Precio</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Categoría</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de Creación</th>
              {Rol !== "2"&&(
              <th className="border border-gray-300 px-4 py-2">Acciones</th>)}
            </tr>
          </thead>
          <tbody>
            {producto.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                <td className="border border-gray-300 px-4 py-2">{product.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{product.descripcion}</td>
                <td className="border border-gray-300 px-4 py-2">{product.precio}</td>
                <td className="border border-gray-300 px-4 py-2">{product.cantidad}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                <td className="border border-gray-300 px-4 py-2">{product.categoria}</td>
                <td className="border border-gray-300 px-4 py-2">{product.fechaCreacion}</td>
                {Rol !== "2" && (
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <Link
                    to={`/productos/editar/${product.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminarProducto(product.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
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

export default Producto;
