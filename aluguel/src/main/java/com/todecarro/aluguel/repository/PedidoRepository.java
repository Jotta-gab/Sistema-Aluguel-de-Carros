package com.todecarro.aluguel.repository;

import com.todecarro.aluguel.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByCpf(String cpf);
    List<Pedido> findByStatus(String status);
}
