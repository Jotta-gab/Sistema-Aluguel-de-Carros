package com.todecarro.aluguel.controller;

import com.todecarro.aluguel.model.Contrato;
import com.todecarro.aluguel.model.Pedido;
import com.todecarro.aluguel.service.ContratoService;
import com.todecarro.aluguel.service.PedidoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/admin")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/cadastrarContrato")
    @ResponseBody
    public Contrato cadastrarContrato(@RequestBody Contrato contrato) {
        return contratoService.cadastrarContrato(contrato);
    }

    @GetMapping("/pedido/{cpf}")
    @ResponseBody
    public Pedido consultarPedidoPorCpf(@PathVariable String cpf) {
        return pedidoService.consultarPedidoPorCpf(cpf);
    }

    @GetMapping("/contrato/{cpf}")
    @ResponseBody
    public Optional<Contrato> buscarContratoPorCpf(@PathVariable String cpf) {
        return contratoService.buscarContratoPorCpf(cpf);
    }

    @GetMapping("/contratos")
    @ResponseBody
    public List<Contrato> listarContratos() {
        return contratoService.listarContratos();
    }
}
