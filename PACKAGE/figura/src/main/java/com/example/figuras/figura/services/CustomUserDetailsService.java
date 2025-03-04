package com.example.figuras.figura.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.figuras.figura.entity.Usuario;
import com.example.figuras.figura.repository.UsuarioRepository;

public class CustomUserDetailsService implements UserDetailsService{
    
    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)  throws UsernameNotFoundException{
        Usuario usuario =  usuarioRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return usuario;
    }
    
}
