package com.aluguelcarro.todecarro.controller;

import com.aluguelcarro.todecarro.model.Usuario;
import com.aluguelcarro.todecarro.repository.UsuarioRepository;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AutenticacaoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/login")
    public String login() {
        return "login";  // Retorna a página de login
    }

    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastrar";  // Retorna a página de cadastro
    }

    @PostMapping("/cadastrar")
    public String cadastrarUsuario(String tipo, String nome, String email, String senha) {
        Usuario usuario = new Usuario();
        usuario.setTipo(tipo);
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);  // Se fosse usar Spring Security, teria que codificar a senha

        usuarioRepository.save(usuario);

        return "redirect:/login";  // Redireciona para o login após o cadastro
    }

@PostMapping("/login")
@ResponseBody
public ResponseEntity<?> loginUsuario(String email, String senha) {
    Usuario usuario = usuarioRepository.findByEmailAndSenha(email, senha);

    if (usuario != null) {
        // Verifica o tipo de usuário de forma insensível a maiúsculas/minúsculas
        if ("agente".equalsIgnoreCase(usuario.getTipo())) {
            return ResponseEntity.ok("{\"tipo\": \"agente\"}");
        } else if ("cliente".equalsIgnoreCase(usuario.getTipo())) {
            return ResponseEntity.ok("{\"tipo\": \"cliente\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"erro\": \"Tipo de usuário desconhecido\"}");
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"erro\": \"Credenciais inválidas\"}");
    }
}



    @GetMapping("/clientes")
    public String clientes() {
        return "clientes";  // Retorna a página clientes.html
    }

    @GetMapping("/agentes")
    public String agentes() {
        return "agentes";  // Retorna a página agentes.html
    }
}
