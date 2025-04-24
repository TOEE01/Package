package com.example.figuras.figura.services;

import com.example.figuras.figura.entity.Producto;
import com.example.figuras.figura.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> ListarProductos() {//Listamos los productos
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerProductoPorId(Long id){//obtener el producto por el id
        return productoRepository.findById(id);

    }
    //esta tentativo a buscar por categoria//
    public List <Producto> obtenerPorCategoria(String categoria){
        return productoRepository.findByNombreContainingIgnoreCase(categoria);
    } 

    public List<Producto> obtenerPorNombre(String nombre){
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Producto guardasProducto(Producto producto){//guardar el producto
        return productoRepository.save(producto);
    }

    public Producto actualizaProducto(Long id, Producto productoActualizado){
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setStock(productoActualizado.getStock());
            producto.setStock_minimo(productoActualizado.getStock_minimo());
            producto.setCategoria(productoActualizado.getCategoria());
            producto.setCantidad(productoActualizado.getCantidad());
            return productoRepository.save(producto);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    public void eliminarProduto(Long id){//Eliminar el producto mediante el id del producto
        productoRepository.deleteById(id);
    }
}
