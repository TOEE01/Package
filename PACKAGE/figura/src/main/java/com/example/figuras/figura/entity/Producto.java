package com.example.figuras.figura.entity;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Producto{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable =  false, unique = true)
    private String nombre;

    @Column(nullable =  false)
    private String descripcion;

    @Column(nullable =  false)
    private Long precio;
    
    @Column(nullable =  false)
    private Long stock;

    @Column(nullable =  false)
    private Long stock_minimo;

    @Column(nullable = false)
    private String categoria;

    @Column(updatable = false)  // No se puede modificar después de la creación
    @CreationTimestamp  // Hibernate asigna la fecha automáticamente
    private LocalDateTime fechaCreacion;
}
