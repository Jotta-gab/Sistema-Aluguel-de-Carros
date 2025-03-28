package com.todecarro.aluguel.controller;

import com.todecarro.aluguel.model.Veiculo;
import com.todecarro.aluguel.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    // Endpoint para cadastrar um veículo

    @PostMapping("/cadastrarVeiculo")
@ResponseBody
public Veiculo cadastrarVeiculo(@RequestBody Veiculo veiculo) {
    return veiculoService.cadastrarVeiculo(veiculo);
}


    // Endpoint para listar veículos disponíveis
    @GetMapping("/veiculosDisponiveis")
    @ResponseBody
    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoService.listarVeiculosDisponiveis();
    }

    // Endpoint para listar veículos alugados
    @GetMapping("/veiculosAlugados")
    @ResponseBody
    public List<Veiculo> listarVeiculosAlugados() {
        return veiculoService.listarVeiculosAlugados();
    }

    // Endpoint para alterar o status de um veículo
    @PostMapping("/alterarStatus/{id}")
    @ResponseBody
    public Veiculo alterarStatus(@PathVariable Long id, @RequestParam String status) {
        return veiculoService.alterarStatus(id, status);
    }
}

