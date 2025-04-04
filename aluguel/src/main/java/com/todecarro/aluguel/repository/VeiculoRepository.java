package com.todecarro.aluguel.repository;

import com.todecarro.aluguel.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByStatus(String status);
    List<Veiculo> findByTipo(String tipo);
    List<Veiculo> findByMarca(String marca);
    List<Veiculo> findByPrecoDiariaLessThanEqual(double preco);
    List<Veiculo> findByPrecoDiariaGreaterThanEqual(double preco);
    
    // Novos métodos combinados
    List<Veiculo> findByTipoAndStatus(String tipo, String status);
    List<Veiculo> findByMarcaAndStatus(String marca, String status);
    List<Veiculo> findByPrecoDiariaLessThanEqualAndStatus(double preco, String status);
    List<Veiculo> findByPrecoDiariaGreaterThanEqualAndStatus(double preco, String status);
}