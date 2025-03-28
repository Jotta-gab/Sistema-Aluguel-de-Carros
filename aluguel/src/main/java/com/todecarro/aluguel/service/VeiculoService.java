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

    // Método para cadastrar um veículo
    public Veiculo cadastrarVeiculo(Veiculo veiculo) {
        veiculo.setStatus("Disponível"); // Status inicial é sempre Disponível
        return veiculoRepository.save(veiculo);
    }

    // Método para buscar todos os veículos com status "Disponível"
    public List<Veiculo> listarVeiculosDisponiveis() {
        return veiculoRepository.findByStatus("Disponível");
    }

    // Método para buscar todos os veículos com status "Alugado"
    public List<Veiculo> listarVeiculosAlugados() {
        return veiculoRepository.findByStatus("Alugado");
    }

    // Método para alterar o status de um veículo
    public Veiculo alterarStatus(Long id, String novoStatus) {
        Veiculo veiculo = veiculoRepository.findById(id).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setStatus(novoStatus);
        return veiculoRepository.save(veiculo);
    }
}

