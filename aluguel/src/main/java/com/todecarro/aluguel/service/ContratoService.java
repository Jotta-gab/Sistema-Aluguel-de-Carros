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
        // Sugestão de melhoria: essa lógica de cálculo poderia estar encapsulada no próprio domínio `Contrato`.
        // Isso melhoraria a coesão e isolaria a lógica de negócios da camada de serviço.
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
        // Retornar apenas o primeiro pedido pode causar ambiguidade se houver múltiplos pedidos.
        // Melhor: retornar uma lista ou aplicar um critério mais claro (último pedido, pedido ativo, etc.).
        List<Pedido> pedidos = pedidoRepository.findByCpf(cpf);
        return pedidos.isEmpty() ? null : pedidos.get(0);
    }

    public void cancelarContrato(Long id) {
        contratoRepository.findById(id).ifPresent(contrato -> {
            contrato.setAtivo(false);
            contratoRepository.save(contrato);
        });

        // Sugestão: considere retornar um boolean indicando se a operação foi bem-sucedida ou não (para feedback de API).
    }

    public void excluirContrato(Long id) {
        // Essa operação é destrutiva. Antes de excluir, considerar validar se o contrato pode ser removido
        // (ex: se já terminou, se não tem pagamentos pendentes, etc.).
        contratoRepository.deleteById(id);
    }

    public List<Contrato> listarTodosContratos() {
        return contratoRepository.findAll(); 
    }
}