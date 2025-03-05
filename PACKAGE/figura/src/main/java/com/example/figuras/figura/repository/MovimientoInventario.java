package com.example.figuras.figura.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.figuras.figura.entity.Movimiento;

public interface MovimientoInventario extends JpaRepository <Movimiento, Long>{
    List<Movimiento> findByTipo(String tipo);
    
    
}

