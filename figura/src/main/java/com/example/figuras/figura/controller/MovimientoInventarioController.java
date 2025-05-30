package com.example.figuras.figura.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.figuras.figura.entity.Movimiento;
import com.example.figuras.figura.services.MovimientoInventarioService;


@RestController
@RequestMapping("/api/movimientos")
public class MovimientoInventarioController {
    
    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @GetMapping
    public List<Movimiento> obtenerTodos(){
        return movimientoInventarioService.obtenerTodos();
    }
    /*@GetMapping
    public ResponseEntity<List<Movimiento>> ObtenerTodos(){
        List<Movimiento> movimientos = movimientoInventarioService.obtenerTodos();
        return ResponseEntity.ok(movimientos);
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> obtenerMovimientoPorId(@PathVariable Long id) {
        Optional<Movimiento> movimiento = movimientoInventarioService.obtenerPorId(id);
    
    if (movimiento.isPresent()) {
        return ResponseEntity.ok(movimiento.get());
    } else {
        return ResponseEntity.notFound().build(); // Devuelve 404 si no existe
    }
    }  

    @GetMapping("/tipo/{tipo}")
    public List<Movimiento> obtenerPorTipo(@PathVariable String tipo){
        return movimientoInventarioService.obtenerPortipo(tipo);
    }

    @PostMapping
    public ResponseEntity<Movimiento> crearMovimiento(@RequestBody Movimiento movimiento){
        Movimiento nuevoMovimiento = movimientoInventarioService.guardarMovimiento(movimiento);
        return ResponseEntity.ok(nuevoMovimiento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMovimiento(@PathVariable Long id){
        movimientoInventarioService.eliminarMovimiento(id);
        return ResponseEntity.noContent().build();
    }
}
