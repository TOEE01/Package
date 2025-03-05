package com.example.figuras.figura.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.figuras.figura.entity.Producto;
import com.example.figuras.figura.services.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/productos")
@Tag(name =  "productos", description = "API para gestionar los productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @Operation(
        summary = "Obtenemos la lista de todos los productos",
        description = "Este endpoint nos permite el poder ver la lista de todos los productos", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de todos los productos"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @GetMapping
    public List<Producto> obtenerProductos(){
        return productoService.ListarProductos();
    }

    @Operation(
        summary = "Obtenemos la lista de todos los productos mediante el nombre del producto",
        description = "Este endpoint nos permite el poder ver la lista de productos mediante el nombre del producto", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de los productos"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam String nombre){
        List<Producto> producto = productoService.obtenerPorNombre(nombre);
        return ResponseEntity.ok(producto);
    }

    @Operation(
        summary = "Crear un producto",
        description = "Este endpoint nos permite el poder crear un nuevo producto", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Producto creado con exito"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto){
        return ResponseEntity.ok(productoService.guardasProducto(producto));
    }

    @Operation(
        summary = "Obtenemos la lista por ID",
        description = "Este endpoint nos permite el obtener un producto con el ID", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de todos los productos"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @GetMapping({"/{id}"})
    public Optional<Producto> obtenerProductoPorId (@PathVariable Long id){
        return productoService.obtenerProductoPorId(id);
    }


    @Operation(
        summary = "Actualizar producto",
        description = "Este endpoint podremos actualizar los productos con el metodo post y lo buscamos mediante el id ", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Producto actualizado con exito"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @PutMapping({"/{id}"})
    public Producto actualizaProducto(@PathVariable Long id,@RequestBody Producto producto){
        return productoService.actualizaProducto(id, producto);

    }

    @Operation(
        summary = "Eliminar Producto",
        description = "Este endpoint podremos eliminar un producto mediante el ID", 
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de todos los productos"),
            @ApiResponse(responseCode = "404", description = "Not Found" ),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        }
    )
    @DeleteMapping("/{id}")
    public void eliminarProduto(@PathVariable Long id){
        productoService.eliminarProduto(id);
    }

}
