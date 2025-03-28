package com.aluguelcarro.todecarro.repository;

import com.aluguelcarro.todecarro.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Adicionando o método para buscar usuário por e-mail e senha
    Usuario findByEmailAndSenha(String email, String senha);
}
