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

    @PostMapping("/cadastrarVeiculo")
@ResponseBody
public Veiculo cadastrarVeiculo(@RequestBody Veiculo veiculo) {
    return veiculoService.cadastrarVeiculo(veiculo);
}


    @GetMapping("/veiculosDisponiveis")
    @ResponseBody
    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoService.listarVeiculosDisponiveis();
    }

    @GetMapping("/veiculosAlugados")
    @ResponseBody
    public List<Veiculo> listarVeiculosAlugados() {
        return veiculoService.listarVeiculosAlugados();
    }

    @PostMapping("/alterarStatus/{id}")
    @ResponseBody
    public Veiculo alterarStatus(@PathVariable Long id, @RequestParam String status) {
        return veiculoService.alterarStatus(id, status);
    }

    @GetMapping("/todosVeiculos")
    @ResponseBody
    public List<Veiculo> listarTodosVeiculos() {
        return veiculoService.listarTodosVeiculos();
    }

    @GetMapping("/veiculosPorTipo/{tipo}")
    @ResponseBody
    public List<Veiculo> listarVeiculosPorTipo(@PathVariable String tipo) {
        return veiculoService.listarVeiculosPorTipo(tipo);
    }

    @GetMapping("/veiculosPorMarca/{marca}")
    @ResponseBody
    public List<Veiculo> listarVeiculosPorMarca(@PathVariable String marca) {
        return veiculoService.listarVeiculosPorMarca(marca);
    }

    @GetMapping("/veiculosPorPrecoMaximo/{precoMaximo}")
    @ResponseBody
    public List<Veiculo> listarVeiculosPorPrecoMaximo(@PathVariable double precoMaximo) {
        return veiculoService.listarVeiculosPorPrecoMaximo(precoMaximo);
    }

    @GetMapping("/veiculosPorPrecoMinimo/{precoMinimo}")
    @ResponseBody
    public List<Veiculo> listarVeiculosPorPrecoMinimo(@PathVariable double precoMinimo) {
        return veiculoService.listarVeiculosPorPrecoMinimo(precoMinimo);
    }
}

