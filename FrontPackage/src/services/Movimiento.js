import api from '../services/Api';

export const getMovimiento = async () =>{
    try {
        const response = await api.get('/api/movimientos');
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error('Error al obtener los datos de los movimientos',error);
        
    }};

    export const postMovimiento = async (data) => {
        try {
            const response = await api.post("/api/movimientos",data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error ('Error al crear el nuevo movimiento')
        }
    };

export const eliminarMovimiento = async (id) => {
    try {
        const response = await api.delete(`/api/movimientos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el movimientos');
        
    }
}

export const actualizarMovimiento = async (id,movimientoActualizado) =>{
    try {
        const response = await api.put(`/api/movimientos/${id}`,movimientoActualizado);
        return response.data;
    } catch (error) {
        console.error(error);
    throw new Error("Error al actualizar el movimiento");
    }
}

export const getMovimientoPorId = async (id) => {
        try {
        const response = await api.get(`/api/movimientos/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener el movimiento");
    }
};