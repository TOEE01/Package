package com.example.figuras.figura.repository; 

import com.example.figuras.figura.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    Usuario findByRol(String rol);
}
