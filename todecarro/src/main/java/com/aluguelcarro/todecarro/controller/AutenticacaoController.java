package com.aluguelcarro.todecarro.controller;

import com.aluguelcarro.todecarro.model.Usuario;
import com.aluguelcarro.todecarro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AutenticacaoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/login")
    public String login() {
        return "login";  // Retorna o HTML do login
    }

    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastrar";  // Retorna o HTML do cadastro
    }

    @PostMapping("/cadastrar")
    public String cadastrarUsuario(String tipo, String nome, String email, String senha) {
        Usuario usuario = new Usuario();
        usuario.setTipo(tipo);
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);

        usuarioRepository.save(usuario);

        return "redirect:/login";  // Após o cadastro, redireciona para o login
    }

    @PostMapping("/login")
    public String loginUsuario(String email, String senha, Model model) {
        Usuario usuario = usuarioRepository.findByEmailAndSenha(email, senha);  // Exemplo simples, sem encriptação

        if (usuario != null) {
            // Redireciona para a página correta com base no tipo de usuário
            if ("cliente".equals(usuario.getTipo())) {
                return "redirect:/clientes";  // Se for cliente, vai para clientes.html
            } else if ("agente".equals(usuario.getTipo())) {
                return "redirect:/agentes";  // Se for agente, vai para agentes.html
            }
        } else {
            model.addAttribute("erro", "Credenciais inválidas");
            return "login";  // Retorna para o login com a mensagem de erro
        }
        return "login";  // Retorna para o login caso o tipo não seja reconhecido
    }

    @GetMapping("/clientes.html")
    public String clientes() {
        return "clientes.html";  // Retorna a página de clientes
    }

    @GetMapping("/agentes.html")
    public String agentes() {
        return "agentes.html";  // Retorna a página de agentes
    }
}
