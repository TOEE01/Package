package com.example.figuras.figura.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.figuras.figura.entity.Usuario;
import com.example.figuras.figura.services.UsuarioService;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        // Buscar el usuario por correo electrónico
        Usuario usuarioExistente = usuarioService.buscarPorEmail(usuario.getEmail());
        String rol = usuarioExistente.getRol();
        if (usuarioExistente != null) {
            if (usuarioExistente.getPassword().equals(usuario.getPassword())) {
                return ResponseEntity.ok( usuarioExistente );
            } else {
                return ResponseEntity.status(401).body("Contraseña incorrecta.");
            }
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }
    }
}
