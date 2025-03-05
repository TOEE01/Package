package com.example.figuras.figura.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.figuras.figura.Enum.TipoMovimiento;
import com.example.figuras.figura.entity.Movimiento;
import com.example.figuras.figura.entity.Producto;
import com.example.figuras.figura.repository.MovimientoInventario;
import com.example.figuras.figura.repository.ProductoRepository;


@Service
public class MovimientoInventarioService {
    
    @Autowired
    private MovimientoInventario movimientoRepository;


    @Autowired
    private ProductoRepository productoRepository;
    public List<Movimiento> obtenerTodos(){
        return movimientoRepository.findAll();
    }


    public Optional<Movimiento> obtenerPorId(Long id) {
        return movimientoRepository.findById(id);
    }


    public List<Movimiento> obtenerPortipo(String tipo){
        return movimientoRepository.findByTipo(tipo); 
    }


    public Movimiento guardarMovimiento(Movimiento movimiento){
        Producto producto = movimiento.getProducto();

    if (producto == null) {
        throw new IllegalArgumentException("El producto no puede ser nulo");
    }
    producto = productoRepository.findById(producto.getId())
            .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

    if (movimiento.getTipo() == TipoMovimiento.ENTRADA) {
        producto.setStock(producto.getStock() + movimiento.getCantidad());
    } else if (movimiento.getTipo() == TipoMovimiento.SALIDA) {
        if (producto.getStock() < movimiento.getCantidad()) {
            throw new IllegalArgumentException("No hay suficiente stock para realizar la salida");
        }
        producto.setStock(producto.getStock() - movimiento.getCantidad());
    }

    productoRepository.save(producto);

    return movimientoRepository.save(movimiento);


    }

    public void eliminarMovimiento(Long id){
        movimientoRepository.deleteById(id);
    }

    public Movimiento actualizarMovimiento(Long id, Movimiento movimientoActualizado){
        return movimientoRepository.findById(id).map(movimiento -> {
            movimiento.setUsuario(movimientoActualizado.getUsuario());
            movimiento.setProducto(movimientoActualizado.getProducto());
            movimiento.setCantidad(movimientoActualizado.getCantidad());
            movimiento.setTipo(movimientoActualizado.getTipo());
            return movimientoRepository.save(movimiento);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Producto no econtrado"));
    }
}
