package com.todecarro.aluguel.service;

import com.todecarro.aluguel.model.Usuario;
import com.todecarro.aluguel.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        // ALERTA CRÍTICO DE SEGURANÇA: Comparar senhas em texto plano é uma falha grave.
        // Sugestão: usar hashing seguro (ex: BCrypt) para armazenar e verificar senhas.
        if (usuario.isPresent() && usuario.get().getSenha().equals(senha)) {
            return usuario.get();
        }
        return null;
    }

    public Usuario cadastrar(Usuario usuario) {
        // Mesma preocupação de segurança: é importante fazer o hash da senha ANTES de persistir no banco.
        // Sugestão: usar BCryptPasswordEncoder para isso.
        return usuarioRepository.save(usuario);
    }

}