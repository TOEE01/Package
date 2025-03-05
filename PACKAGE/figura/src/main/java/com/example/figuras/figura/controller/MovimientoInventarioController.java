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
import org.springframework.web.bind.annotation.RestController;

import com.example.figuras.figura.entity.Movimiento;
import com.example.figuras.figura.services.MovimientoInventarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/movimientos")
@Tag(name = "movimiento", description= "API para gestionar los movimientos de inventario")
public class MovimientoInventarioController {
    
    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @Operation(
        summary = "Obtener todos los movimientos",
        description ="El Endpoint nos pemite traer todos los movimientos de inventario tanto de entrada como de salida",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista de todos los movimientos"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        } 
    )
    @GetMapping
    public List<Movimiento> obtenerTodos(){
        return movimientoInventarioService.obtenerTodos();
    }

    @Operation(
        summary = "Movimientos por ID",
        description ="El Endpoint podremos traer los movimientos mediante el ID",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista del movimientos"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        }
    ) 
    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> obtenerMovimientoPorId(@PathVariable Long id) {
        Optional<Movimiento> movimiento = movimientoInventarioService.obtenerPorId(id);
    
    if (movimiento.isPresent()) {
        return ResponseEntity.ok(movimiento.get());
    } else {
        return ResponseEntity.notFound().build();
    }
    }  

    @Operation(
        summary = "Movimientos por tipo",
        description ="El Endpoint podremos traer los movimientos mediante el tipo (entrada o salida)",
        responses = {
            @ApiResponse(responseCode = "200", description = "Lista del movimientos"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        }
    )
    @GetMapping("/tipo/{tipo}")
    public List<Movimiento> obtenerPorTipo(@PathVariable String tipo){
        return movimientoInventarioService.obtenerPortipo(tipo);
    }

    @Operation(
        summary = "Crear un nuevo movimiento",
        description ="El Endpoint nos permite crear un nuevo movimiento de inventario",
        responses = {
            @ApiResponse(responseCode = "200", description = "Nuevo movimiento"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        })
    @PostMapping
    public ResponseEntity<Movimiento> crearMovimiento(@RequestBody Movimiento movimiento){
        Movimiento nuevoMovimiento = movimientoInventarioService.guardarMovimiento(movimiento);
        return ResponseEntity.ok(nuevoMovimiento);
    }

    @Operation(
        summary = "Borrar un movimiento",
        description ="El Endpoint nos permite borrar un movimiento de inventario",
        responses = {
            @ApiResponse(responseCode = "204", description = "No Content"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMovimiento(@PathVariable Long id){
        movimientoInventarioService.eliminarMovimiento(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Actualizar movimientos",
        description = "El endpoint nos permite el poder actualizar un movimiento",
        responses = {
            @ApiResponse(responseCode = "200", description = "Movimiento actualizado"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        }
        
    )

    @PutMapping("/{id}")
    public Movimiento actualizaMovimiento(@PathVariable Long id,@RequestBody Movimiento movimiento){
        return movimientoInventarioService.actualizarMovimiento(id, movimiento);
    }
}
