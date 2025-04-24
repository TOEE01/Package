/*package com.example.figuras.figura.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll() // permitir crear usuario sin login
                .requestMatchers("/api/auth/**").permitAll() // login sin autenticación previa
                .anyRequest().authenticated()
            )
            .cors(cors -> {}) // habilita CORS
            .httpBasic(httpBasic -> {}); // usa autenticación básica

        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() { // habilita CORS global
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // origen del frontend
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
*/