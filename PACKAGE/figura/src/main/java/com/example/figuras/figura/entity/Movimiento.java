package com.example.figuras.figura.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movimientos_inventario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne  // Relación muchos a uno con Producto
    @JoinColumn(name = "producto_id", nullable = false) // Llave foránea obligatoria
    private Producto producto;

    @ManyToOne  // Relación muchos a uno con Usuario
    @JoinColumn(name = "usuario_id", nullable = false) // Llave foránea obligatoria
    private Usuario usuario;

    @Column(nullable = false)
    private int cantidad;  // Cantidad del movimiento

    @Column(nullable = false)
    private BigDecimal precioUnitario;  // Precio en el momento del movimiento

    @Column(nullable = false)
    private String tipoMovimiento;  // "ENTRADA" o "SALIDA"

    @Column(updatable = false)
    private LocalDateTime fechaMovimiento;

    @PrePersist
    protected void onCreate() {
        this.fechaMovimiento = LocalDateTime.now();
    }
}
