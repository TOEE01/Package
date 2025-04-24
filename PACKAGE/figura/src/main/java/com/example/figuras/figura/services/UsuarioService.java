package com.example.figuras.figura.services;

import com.example.figuras.figura.entity.Usuario;
import com.example.figuras.figura.repository.UsuarioRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public List<Usuario> obtenerUsuariosPorNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Usuario guardarUsuario(Usuario usuario) {
        // Guardar directamente sin cifrar la contraseña
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = obtenerPorId(id);
        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setRol(usuarioActualizado.getRol());
            return usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email); 
    }

    public Usuario buscarPorRol(String rol){
        return usuarioRepository.findByRol(rol);

    }
}
/* 
    public boolean verificarCredenciales(String email, String password) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email); // Asumiendo que tienes el método findByEmail en el repo
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            // Verificar si la contraseña ingresada coincide con la almacenada (cifrada)
            return passwordEncoder.matches(password, usuario.getPassword());
        }
        return false; // El usuario no fue encontrado
    }
}
*/
/* 
    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }*/