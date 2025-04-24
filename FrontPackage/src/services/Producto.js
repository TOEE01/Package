import api from '../services/Api';



export const getProducto = async () =>{
    try {
        const response = await api.get('/api/productos');
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error('Error al obtener los datos del producto',error);
        
    }};

    export const postProducto = async (data) => {
        try {
            const response = await api.post("/api/productos",data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error ('Error al crear el nuevo producto')
        }
    };

export const eliminarProducto = async (id) => {
    try {
        const response = await api.delete(`/api/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el producto');
        
    }
}

export const actualizarProducto = async (id, data) => {
    try {
    const response = await api.put(`/api/productos/${id}`, data);
    return response.data;
    } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el producto');
    }
}

// Obtener un producto por su ID
export const getProductoPorId = async (id) => {
    try {
        const response = await api.get(`/api/productos/${id}`);
        return response.data; // Retorna los datos del producto con el ID especificado
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el producto');
    }
};
