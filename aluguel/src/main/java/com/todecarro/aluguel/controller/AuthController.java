package com.todecarro.aluguel.controller;

import com.todecarro.aluguel.model.Usuario;
import com.todecarro.aluguel.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String senha) {
        Usuario usuario = usuarioService.login(email, senha);

        if (usuario != null) {
            if (usuario.getTipoConta().equals("Administrador")) {
                return "redirect:/administrador.html";
            } else if (usuario.getTipoConta().equals("Agente")) {
                return "redirect:/agente.html";
            } else {
                return "redirect:/cliente.html";
            }
        }
        return "redirect:/login.html";
    }

    @PostMapping("/cadastrar")
public String cadastrar(@RequestParam String nome, 
                        @RequestParam String email, 
                        @RequestParam String senha, 
                        @RequestParam String tipoConta) {
    
    Usuario usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);
    usuario.setTipoConta(tipoConta);

    usuarioService.cadastrar(usuario);
    return "redirect:/login.html";
}

}
