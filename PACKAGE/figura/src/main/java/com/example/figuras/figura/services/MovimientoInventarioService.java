package com.example.figuras.figura.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Movimiento obtenerPorId(Long id){
        return movimientoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movimiento no encontrado"));
    }

    public List<Movimiento> obtenerPortipo(String tipo){
        return movimientoRepository.findByTipo(tipo); 
    }

    public Movimiento guardarMovimiento(Movimiento movimiento){
        Producto producto = movimiento.getProducto();

        if(producto == null){
            throw new IllegalArgumentException("El producto no puede ser nulo");
        }

        if(movimiento.getTipo() == TipoMovimiento.ENTRADA){
            producto.setCantidad(producto.getCantidad() + movimiento.getCantidad());
        }else if(movimiento.getTipo() == TipoMovimiento.SALIDA){
            if(producto.getCantidad() < movimiento.getCantidad()){
                throw new IllegalArgumentException("No hay suficiente Stock para realizar la salida");
            }
            producto.setStock(producto.getStock() - movimiento.getCantidad());
        }
        productoRepository.save(producto);
        return movimientoRepository.save(movimiento);


    }

    public void eliminarMovimiento(Long id){
        movimientoRepository.deleteById(id);
    }
}
