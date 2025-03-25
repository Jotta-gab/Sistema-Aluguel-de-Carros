package com.todecarro.alugueldecarros.repository;

import com.todecarro.alugueldecarros.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
