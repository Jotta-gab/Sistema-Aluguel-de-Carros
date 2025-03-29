package com.todecarro.aluguel.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String cpfCliente;
    private String telefoneCliente;
    private String modeloCarro;
    private String placaCarro;
    
    @Temporal(TemporalType.DATE)
    private Date dataInicioAluguel;
    
    @Temporal(TemporalType.DATE)
    private Date dataFimAluguel;

    private Double precoDiaria;
    private Integer quantidadeDiarias;
    private Double valorTotalAluguel;
    
    private String formaPagamento;
    
    private String tipoContrato;
    
    private Boolean contratoCredito;
    private String instituicaoCredito;

    private Boolean ativo = true;

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCpfCliente() {
        return cpfCliente;
    }

    public void setCpfCliente(String cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    public String getTelefoneCliente() {
        return telefoneCliente;
    }

    public void setTelefoneCliente(String telefoneCliente) {
        this.telefoneCliente = telefoneCliente;
    }

    public String getModeloCarro() {
        return modeloCarro;
    }

    public void setModeloCarro(String modeloCarro) {
        this.modeloCarro = modeloCarro;
    }

    public String getPlacaCarro() {
        return placaCarro;
    }

    public void setPlacaCarro(String placaCarro) {
        this.placaCarro = placaCarro;
    }

    public Date getDataInicioAluguel() {
        return dataInicioAluguel;
    }

    public void setDataInicioAluguel(Date dataInicioAluguel) {
        this.dataInicioAluguel = dataInicioAluguel;
    }

    public Date getDataFimAluguel() {
        return dataFimAluguel;
    }

    public void setDataFimAluguel(Date dataFimAluguel) {
        this.dataFimAluguel = dataFimAluguel;
    }

    public Double getPrecoDiaria() {
        return precoDiaria;
    }

    public void setPrecoDiaria(Double precoDiaria) {
        this.precoDiaria = precoDiaria;
    }

    public Integer getQuantidadeDiarias() {
        return quantidadeDiarias;
    }

    public void setQuantidadeDiarias(Integer quantidadeDiarias) {
        this.quantidadeDiarias = quantidadeDiarias;
    }

    public Double getValorTotalAluguel() {
        return valorTotalAluguel;
    }

    public void setValorTotalAluguel(Double valorTotalAluguel) {
        this.valorTotalAluguel = valorTotalAluguel;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public String getTipoContrato() {
        return tipoContrato;
    }

    public void setTipoContrato(String tipoContrato) {
        this.tipoContrato = tipoContrato;
    }

    public Boolean getContratoCredito() {
        return contratoCredito;
    }

    public void setContratoCredito(Boolean contratoCredito) {
        this.contratoCredito = contratoCredito;
    }

    public String getInstituicaoCredito() {
        return instituicaoCredito;
    }

    public void setInstituicaoCredito(String instituicaoCredito) {
        this.instituicaoCredito = instituicaoCredito;
    }
}
