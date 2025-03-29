package com.todecarro.aluguel.repository;

import com.todecarro.aluguel.model.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    Optional<Contrato> findByCpfCliente(String cpf);
    List<Contrato> findByAtivoTrue();
}