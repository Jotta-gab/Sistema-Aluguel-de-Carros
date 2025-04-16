package com.todecarro.aluguel.service;

import com.todecarro.aluguel.model.Veiculo;
import com.todecarro.aluguel.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Veiculo cadastrarVeiculo(Veiculo veiculo) {
        // Boa prática: definir status padrão no cadastro. No entanto, isso pode ser encapsulado dentro da própria entidade Veiculo.
        // Sugestão: mover para um método como veiculo.marcarComoDisponivel() para maior coesão no modelo.
        veiculo.setStatus("Disponível");
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoRepository.findByStatus("Disponível");
    }

    public List<Veiculo> listarVeiculosAlugados() {
        return veiculoRepository.findByStatus("Alugado");
    }

    public Veiculo alterarStatus(Long id, String novoStatus) {
        // Evitar expor exceções genéricas como RuntimeException. 
        // Sugestão: criar exceção customizada como VeiculoNaoEncontradoException para melhorar rastreabilidade.
        Veiculo veiculo = veiculoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        // A lógica de mudança de status também poderia ser responsabilidade da entidade: veiculo.atualizarStatus(novoStatus)
        veiculo.setStatus(novoStatus);
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarVeiculosPorTipo(String tipo) {
        // Todas essas listagens estão acopladas ao status "Disponível".
        // Se for uma regra de negócio global, vale centralizar esse filtro em um método utilitário no repositório ou camada de domínio.
        return veiculoRepository.findByTipoAndStatus(tipo, "Disponível");
    }

    public List<Veiculo> listarVeiculosPorMarca(String marca) {
        return veiculoRepository.findByMarcaAndStatus(marca, "Disponível");
    }

    public List<Veiculo> listarVeiculosPorPrecoMaximo(double precoMaximo) {
        return veiculoRepository.findByPrecoDiariaLessThanEqualAndStatus(precoMaximo, "Disponível");
    }

    public List<Veiculo> listarVeiculosPorPrecoMinimo(double precoMinimo) {
        return veiculoRepository.findByPrecoDiariaGreaterThanEqualAndStatus(precoMinimo, "Disponível");
    }

    public List<Veiculo> listarTodosVeiculos() {
        return veiculoRepository.findAll();
    }
}