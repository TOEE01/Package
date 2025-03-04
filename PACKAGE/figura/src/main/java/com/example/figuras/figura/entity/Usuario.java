/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.figuras.figura.entity;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;



/**
  *
  * @author apriz
  */

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol;

    @Override
    public String getUsername(){
      return nombre;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
      return List.of(new SimpleGrantedAuthority("ROL_" + rol));
    }

    @Override
    public boolean isAccountNonExpired(){
      return true;
    }

    @Override
    public boolean isAccountNonLocked(){
      return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
      return true;
    }

    @Override
    public boolean isEnabled(){
      return true;
    }
}

