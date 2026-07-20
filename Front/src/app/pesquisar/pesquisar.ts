import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Router } from '@angular/router'; 
import { ProdutoService } from '../service/produto'; 

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pesquisar.html',
  styleUrl: './pesquisar.css',
})
export class Pesquisa implements OnInit {
  busca: string = '';
  cor: string = '';
  precoMax: number | null = null;
  
  lista: Produto[] = [];

  constructor(
    private router: Router, 
    private service: ProdutoService,
    private cdr: ChangeDetectorRef // 👈 Injetamos o atualizador
  ) {}

  ngOnInit() {
    this.carregarTodos();
  }

  carregarTodos() {
    this.service.carregarVitrine().subscribe({
      next: (retorno: Produto[]) => {
        this.lista = retorno;
        this.cdr.detectChanges(); // 👈 Atualiza a tela com os resultados
      },
      error: (erro: any) => console.error(erro)
    });
  }

  redirecionar(obj: Produto) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('ProdutoSelecionado', JSON.stringify(obj));
    }
    this.router.navigate(['/detalhe']);
  }

  listaFiltrada() {
    return this.lista.filter((obj) => {
      return (
        (!this.busca || obj.nome.toLowerCase().includes(this.busca.toLowerCase()) || obj.keywords.toLowerCase().includes(this.busca.toLowerCase())) &&
        (!this.cor || obj.cor.toLowerCase() === this.cor.toLowerCase()) &&
        (!this.precoMax || obj.valor <= this.precoMax)
      );
    });
  }
}