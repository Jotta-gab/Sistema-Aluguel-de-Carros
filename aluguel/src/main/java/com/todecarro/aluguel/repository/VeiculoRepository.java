package com.todecarro.aluguel.repository;

import com.todecarro.aluguel.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
    // Buscar veículos por status
    List<Veiculo> findByStatus(String status);
}

