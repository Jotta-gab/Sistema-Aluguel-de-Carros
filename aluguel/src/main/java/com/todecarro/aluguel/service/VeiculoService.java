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
        Veiculo veiculo = veiculoRepository.findById(id).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setStatus(novoStatus);
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarVeiculosPorTipo(String tipo) {
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

