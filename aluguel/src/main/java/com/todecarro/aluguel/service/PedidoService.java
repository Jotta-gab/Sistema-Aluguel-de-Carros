package com.todecarro.aluguel.service;

import com.todecarro.aluguel.model.Pedido;
import com.todecarro.aluguel.model.Veiculo;
import com.todecarro.aluguel.repository.PedidoRepository;
import com.todecarro.aluguel.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    // Método para listar pedidos com status "Em Análise"
    public List<Pedido> listarPedidosPendentes() {
        return pedidoRepository.findByStatus("Em Análise");
    }

    // Método para aprovar ou reprovar um pedido
    public boolean aprovarOuReprovarPedido(Long id, String status) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedido pedido = pedidoOptional.get();
            pedido.setStatus(status);
            pedidoRepository.save(pedido);
            return true;
        }
        return false;
    }

    public Pedido criarPedido(Pedido pedido) {
        Veiculo veiculo = pedido.getVeiculo();
        
        // Buscar o veículo completo no banco de dados para obter o modelo
        Veiculo veiculoCompleto = veiculoRepository.findById(veiculo.getId())
            .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        
        // Definir o modelo no pedido
        pedido.setModelo(veiculoCompleto.getModelo());
        
        double valorAluguel = veiculoCompleto.getPrecoDiaria() * pedido.getDiasAluguel();

        if (pedido.getParcelas() >= 4) {
            double juros = 0.05 * valorAluguel;
            valorAluguel += juros;
        }

        pedido.setValorComJuros(valorAluguel);
        return pedidoRepository.save(pedido);
    }
    // Método para listar pedidos de um cliente com base no CPF
    public List<Pedido> listarPedidosPorCpf(String cpf) {
        return pedidoRepository.findByCpf(cpf);
    }

    // Método para listar veículos disponíveis
    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoRepository.findByStatus("Disponível");
    }

    public boolean cancelarPedido(Long id) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedido pedido = pedidoOptional.get();
            if (!pedido.getStatus().equals("Em Análise")) {
                return false;
            }
            pedidoRepository.delete(pedido);
            return true;
        }
        return false;
    }

    // Método para listar todos os pedidos
public List<Pedido> listarTodosPedidos() {
    return pedidoRepository.findAll(); // Retorna todos os pedidos
}

public Pedido consultarPedidoPorCpf(String cpf) {
    List<Pedido> pedidos = pedidoRepository.findByCpf(cpf);

    if (pedidos.isEmpty()) {
        throw new UnsupportedOperationException("Nenhum pedido encontrado para o CPF informado.");
    }

    return pedidos.get(0);
}

}
