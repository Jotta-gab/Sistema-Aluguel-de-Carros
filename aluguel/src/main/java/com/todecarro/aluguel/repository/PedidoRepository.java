package com.todecarro.aluguel.repository;

import com.todecarro.aluguel.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Método para buscar pedidos pelo CPF no Pedido
    List<Pedido> findByCpf(String cpf);  // Buscar pedidos pelo CPF
}
