package com.example.figuras.figura.entity;

import java.time.LocalDateTime;

import com.example.figuras.figura.Enum.TipoMovimiento;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movimientos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne  // Relación con Producto
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Enumerated(EnumType.STRING) // Para asegurar que solo se use "ENTRADA" o "SALIDA"
    @Column(nullable = false)
    private TipoMovimiento tipo;

    @Column(nullable = false)
    private int cantidad;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fecha;

    @ManyToOne  // Relación con Usuario
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDateTime.now();
    }
}
