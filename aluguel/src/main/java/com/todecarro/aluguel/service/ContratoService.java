package com.todecarro.aluguel.service;

import com.todecarro.aluguel.model.Contrato;
import com.todecarro.aluguel.model.Pedido;
import com.todecarro.aluguel.repository.ContratoRepository;
import com.todecarro.aluguel.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    public Contrato cadastrarContrato(Contrato contrato) {
        contrato.setValorTotalAluguel(contrato.getQuantidadeDiarias() * contrato.getPrecoDiaria());
        contrato.setAtivo(true);
        return contratoRepository.save(contrato);
    }

    public Optional<Contrato> buscarContratoPorCpf(String cpf) {
        return contratoRepository.findByCpfCliente(cpf);
    }

    public List<Contrato> listarContratos() {
        return contratoRepository.findByAtivoTrue();
    }

    public Pedido consultarPedidoPorCpf(String cpf) {
        List<Pedido> pedidos = pedidoRepository.findByCpf(cpf);
        return pedidos.isEmpty() ? null : pedidos.get(0);
    }

    public void cancelarContrato(Long id) {
        contratoRepository.findById(id).ifPresent(contrato -> {
            contrato.setAtivo(false);
            contratoRepository.save(contrato);
        });
    }

    public void excluirContrato(Long id) {
        contratoRepository.deleteById(id);
    }

    public List<Contrato> listarTodosContratos() {
        return contratoRepository.findAll(); 
    }
}