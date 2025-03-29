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

    // Endpoint para listar pedidos com status "Em Análise"
    @GetMapping("/pedidosPendentes")
    @ResponseBody
    public List<Pedido> listarPedidosPendentes() {
        return pedidoService.listarPedidosPendentes(); // Chama o serviço para pegar pedidos "Em Análise"
    }

    // Endpoint para aprovar pedido
    @PostMapping("/aprovarPedido/{id}")
    @ResponseBody
    public String aprovarPedido(@PathVariable Long id) {
        boolean aprovado = pedidoService.aprovarOuReprovarPedido(id, "Aprovado");
        return aprovado ? "Pedido aprovado com sucesso!" : "Erro ao aprovar pedido.";
    }

    // Endpoint para reprovar pedido
    @PostMapping("/reprovarPedido/{id}")
    @ResponseBody
    public String reprovarPedido(@PathVariable Long id) {
        boolean aprovado = pedidoService.aprovarOuReprovarPedido(id, "Reprovado");
        return aprovado ? "Pedido reprovado com sucesso!" : "Erro ao reprovar pedido.";
    }

    // Adicionando um método para listar todos os pedidos
@GetMapping("/todosPedidos")
@ResponseBody
public List<Pedido> listarTodosPedidos() {
    return pedidoService.listarTodosPedidos(); // Chama o serviço para pegar todos os pedidos
}

}
