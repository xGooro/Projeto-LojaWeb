package com.fatec.loja;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;


    @ManyToOne//Vários pedidos podem pertencer a um único Cliente
    @JoinColumn(name = "codigo_cliente")
    private Cliente cliente;


    private LocalDateTime dataHora = LocalDateTime.now();

    private double valorTotal;


    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)//Um pedido tem vários Itens
    private List<ItemPedido> itens;


    public int getCodigo() { return codigo; }
    public void setCodigo(int codigo) { this.codigo = codigo; }
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    public double getValorTotal() { return valorTotal; }
    public void setValorTotal(double valorTotal) { this.valorTotal = valorTotal; }
    public List<ItemPedido> getItens() { return itens; }
    public void setItens(List<ItemPedido> itens) { this.itens = itens; }
}