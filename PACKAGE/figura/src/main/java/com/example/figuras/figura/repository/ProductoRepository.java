package com.example.figuras.figura.repository;

import org.springframework.stereotype.Repository;

import com.example.figuras.figura.entity.Producto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface ProductoRepository extends JpaRepository< Producto, Long> {

    Optional<Producto> findByNombre(String nombre);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
