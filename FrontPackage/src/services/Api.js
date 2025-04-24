import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json"},
    withCredentials: false,
});

export const getUsuario = async () => {
    try {
        const response = await api.get("/api/usuario");
        console.log("Datos recibidos" , response.data);
        return Array.isArray(response.data) ? response.data : response.data.usuario || [];    
    } catch (error) {
        console.error("Error al obtener los datos", error.message);
        return  [];
    }
}

export const getProducto = async() =>{
    try{
        const response =
        await api.get("/api/productos");
        console.log("Datos recibidos", response.data);
        return Array.isArray(response.data) ? response.data : response.data.producto || [];
    }catch(error){
        console.error("Error al ontener los datos",error.message);
        return [];
    }
}

export const getMovimiento = async () =>{
    try {
        const response = await api.get("/api/movimientos");
        console.log("Datos recibidos",response);
        return Array.isArray(response.data) ? response.data : response.data.movimiento || [];
    } catch (error) {
        console.error("Error al enocntrar los movimientos",error);
        return [];
    }
} 

export default api;