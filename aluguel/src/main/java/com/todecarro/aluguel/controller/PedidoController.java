package com.todecarro.aluguel.controller;

import com.todecarro.aluguel.model.Pedido;
import com.todecarro.aluguel.model.Veiculo;
import com.todecarro.aluguel.service.PedidoService;
import com.todecarro.aluguel.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/cliente")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private VeiculoService veiculoService;

    // Endpoint para listar veículos disponíveis
    @GetMapping("/veiculosDisponiveis")
    @ResponseBody
    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoService.listarVeiculosDisponiveis();
    }

    // Endpoint para criar um pedido
    @PostMapping("/criarPedido")
    @ResponseBody
    public Pedido criarPedido(@RequestBody Pedido pedido) {
        return pedidoService.criarPedido(pedido);
    }

    // Endpoint para listar os pedidos de um cliente pelo CPF
    @GetMapping("/meusPedidosCpf")
    @ResponseBody
    public List<Pedido> listarPedidosPorCpf(@RequestParam String cpf) {
        return pedidoService.listarPedidosPorCpf(cpf);
    }
    
    // Endpoint para cancelar pedido
@PostMapping("/cancelarPedido/{id}")
@ResponseBody
public String cancelarPedido(@PathVariable Long id) {
    boolean pedidoCancelado = pedidoService.cancelarPedido(id);
    return pedidoCancelado ? "Pedido cancelado com sucesso!" : "Erro ao cancelar pedido.";
}


}
