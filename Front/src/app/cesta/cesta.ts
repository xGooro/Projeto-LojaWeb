import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ItemCesta } from '../model/item-cesta';
import { Pedido, ItemPedido } from '../model/pedido';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class Cesta implements OnInit {
  lista: ItemCesta[] = [];
  total: number = 0;
  mensagem: string = ''; 

  constructor(
    private router: Router,
    private service: PedidoService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.carregarCesta();
  }

  carregarCesta() {
    if (isPlatformBrowser(this.platformId)) {
      let json = localStorage.getItem('cesta');
      if (json) {
        this.lista = JSON.parse(json);
        this.calcularTotal();
      }
    }
  }

  calcularTotal() {
    this.total = this.lista.reduce((soma, item) => soma + (item.valor * item.quantidade), 0);
  }

 
  aumentar(item: ItemCesta) {
    item.quantidade++;
    this.atualizarStorage();
  }

  diminuir(item: ItemCesta) {
    if (item.quantidade > 1) {
      item.quantidade--;
      this.atualizarStorage();
    }
  }

  remover(item: ItemCesta) {
    this.lista = this.lista.filter(i => i.produto.codigo !== item.produto.codigo);
    this.atualizarStorage();
  }

  limparCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('cesta');
        this.lista = [];
        this.total = 0;
    }
  }

  atualizarStorage() {
    this.calcularTotal();
    if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('cesta', JSON.stringify(this.lista));
    }
  }


  finalizarCompra() {
    if (isPlatformBrowser(this.platformId)) {
      let jsonCliente = localStorage.getItem('Cliente');

      // Não  compra sem logar
      if (!jsonCliente) {
        this.router.navigate(['/login']);
        return;
      }

      
      let itemSemTamanho = this.lista.find(item => item.tamanho === "");
      
      if (itemSemTamanho) {
       
        this.mensagem = `⚠️ Por favor, escolha um tamanho para a camiseta: ${itemSemTamanho.produto.nome}`;
        this.cdr.detectChanges();
        return; 
      }

      let clienteLogado = JSON.parse(jsonCliente);
      let pedido = new Pedido();
      pedido.cliente = clienteLogado;
      pedido.valorTotal = this.total;


      pedido.itens = this.lista.map(item => {
        let ip = new ItemPedido();
        ip.produto = item.produto;
        ip.quantidade = item.quantidade;
        ip.valorUnitario = item.valor; 
        ip.tamanho = item.tamanho; 
        return ip;
      });

      // Dispara a compra para o banco de dados
      this.service.gravar(pedido).subscribe({
        next: (retorno) => {
          this.mensagem = `Sucesso! O número do seu pedido é: ${retorno.codigo}`;
          this.limparCarrinho(); 
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error("Erro no fechamento:", erro);
          if (erro.status === 403) {
             this.mensagem = 'Sua sessão expirou. Por favor, faça o login novamente.';
             localStorage.removeItem('Cliente');
          } else {
             this.mensagem = 'Erro ao processar o pedido. Tente novamente mais tarde.';
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
}