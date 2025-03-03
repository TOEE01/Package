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

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> obtenerProductos(){
        return productoService.ListarProductos();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam String nombre){
        List<Producto> producto = productoService.obtenerPorNombre(nombre);
        return ResponseEntity.ok(producto);
    }

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto){
        return ResponseEntity.ok(productoService.guardasProducto(producto));
    }

    @GetMapping({"/{id}"})
    public Optional<Producto> obtenerProductoPorId (@PathVariable Long id){
        return productoService.obtenerProductoPorId(id);
    }

    @PutMapping({"/{id}"})
    public Producto actualizaProducto(@PathVariable Long id,@RequestBody Producto producto){
        return productoService.actualizaProducto(id, producto);

    }

    @DeleteMapping("/{id}")
    public void eliminarProduto(@PathVariable Long id){
        productoService.eliminarProduto(id);
    }

}
