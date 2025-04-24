import api from '../services/Api';

export const getUsuario = async () => {
    try {
        const response = await api.get('/api/usuario');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los datos del usuario', error);
    }
}

export const getUsuarioPorId = async (id) => {
    const response = await api.get(`/api/usuario/${id}`);
    return response.data;
};

export const postUsuario = async (data) => {
  try {
    const response = await api.post("/api/usuario", data); // sin withCredentials
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error.response || error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
    try {
      const response = await api.delete(`/api/usuario/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  };

  export const actualizarUsuario = async (id, data) => {
    try {
      const response = await api.put(`/api/usuario/${id}`, data); // Cambiado a plural
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el usuario");
    }
  };

  export const loginUsuario = async (data) => {
    try {
      const response = await api.post("/api/auth/login", data);
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response || error);
      throw error;
    }
  };
  