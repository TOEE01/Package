package com.example.figuras.figura.controller;

import com.example.figuras.figura.entity.Usuario;
import com.example.figuras.figura.services.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuario")
@Tag(name = "usuario", description = "API para gestionar usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Operation(
        summary = "Obtiene todos los usuarios",
        description = "Este endpoint devuelve la lista de todos los usuarios registrados, sin importar el id o el nombre",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }

    @Operation(
        summary = "Obtiene los usuarios mediante el id",
        description = "Este endpoint devuelve a un determinado usuario mediante el id",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @GetMapping("/{id}")
    public Optional<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id);
    }

    @Operation(
        summary = "Obtiene todos los usuarios usando un nombre para su busqueda",
        description = "Este endpoint devuelve la lista de todos los usuarios registrados, mediante un nombre de busqueda",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
@GetMapping("/buscar")
    public ResponseEntity<List<Usuario>> buscarPorNombre(@RequestParam String nombre) {
        List<Usuario> usuarios = usuarioService.obtenerUsuariosPorNombre(nombre);
        return ResponseEntity.ok(usuarios);
    }

    @Operation(
        summary = "Crear un nuevo usuario",
        description = "Este endpoint permite crear un nuevo usuario en la base de datos", 
        responses = {
            @ApiResponse(responseCode = "200", description = "usuario creado con exito"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @PostMapping
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody Usuario usuario) {
        String email = usuario.getEmail();
        if (!(email.endsWith("@gmail.com") || email.endsWith("@hotmail.com") || email.endsWith("@outlook.com") || email.endsWith("@example.com"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Validación personalizada
        }
    
        Usuario nuevo = usuarioService.guardarUsuario(usuario);
        return ResponseEntity.ok(nuevo);
    }
    @Operation(
        summary = "Eliminar usuario",
        description = "Este endpoint elimina a un usuario mediante el id de este mismo de la base de datos",
        responses = {
            @ApiResponse(responseCode = "200", description = "Usuario eliminado"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
    }

    @Operation(
    summary = "Actualizar usuario",
    description = "Este endpoint permite actualizar los datos de un usuario existente mediante su ID",
    responses = {
        @ApiResponse(responseCode = "200", description = "Usuario actualizado con éxito"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    }
)
@PutMapping("/{id}")
public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
    Optional<Usuario> usuarioExistente = usuarioService.obtenerPorId(id);
    
    if (usuarioExistente.isPresent()) {
        Usuario usuario = usuarioExistente.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setEmail(usuarioActualizado.getEmail());
        usuario.setRol(usuarioActualizado.getRol());
        
        Usuario actualizado = usuarioService.guardarUsuario(usuario);
        return ResponseEntity.ok(actualizado);
    } else {
        return ResponseEntity.notFound().build();
    }
}
}


