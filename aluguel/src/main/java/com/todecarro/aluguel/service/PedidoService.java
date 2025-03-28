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

    // Método para criar um pedido
    public Pedido criarPedido(Pedido pedido) {
        // Obtemos o veículo e calculamos o valor do aluguel com base nos dias
        Veiculo veiculo = pedido.getVeiculo();
        double valorAluguel = veiculo.getPrecoDiaria() * pedido.getDiasAluguel();

        // Se as parcelas forem 4 ou mais, aplica juros de 5% a cada 3 parcelas
        if (pedido.getParcelas() >= 4) {
            double juros = 0.05 * valorAluguel;  // Juros de 5%
            valorAluguel += juros;
        }

        // Calculando o valor total do pedido
        pedido.setValorComJuros(valorAluguel);

        // Salvando o pedido no banco
        return pedidoRepository.save(pedido);
    }

    // Método para listar pedidos de um cliente com base no CPF
    public List<Pedido> listarPedidosPorCpf(String cpf) {
        // Agora, buscamos diretamente os pedidos pelo CPF
        return pedidoRepository.findByCpf(cpf);  // Método ajustado para buscar pedidos pelo CPF no PedidoRepository
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
                return false; // Somente pedidos "Em Análise" podem ser cancelados
            }
    
            pedidoRepository.delete(pedido);
            return true;
        }
        return false;
    }
    
}
