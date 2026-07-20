import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { ItemCesta } from '../model/item-cesta';
import { FormsModule } from "@angular/forms";
import { ProdutoService } from '../service/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {
  mensagem: string = '';
  lista: Produto[] = [];

  constructor(
    private service: ProdutoService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 Injetamos o atualizador
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.service.carregarVitrine().subscribe({
      next: (retorno: Produto[]) => {
        this.lista = retorno; 
        this.cdr.detectChanges(); // 👈 Atualiza a tela instantaneamente
      },
      error: (erro: any) => {
        console.error("Erro ao carregar do banco de dados:", erro);
        this.mensagem = "Erro ao carregar a vitrine. Verifique se o back-end está rodando.";
      }
    });
  }

  redirecionar(obj: Produto) {
    if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('ProdutoSelecionado', JSON.stringify(obj));
    }
    this.router.navigate(['/detalhe']); 
  }

  adicionarItemCesta(obj: Produto) {
    let json = localStorage.getItem('cesta');
    let lista: ItemCesta[] = [];
    let item: ItemCesta = new ItemCesta();
    item.produto = obj;
    item.quantidade = 1;
    item.valor = obj.valor;

    if (json != null) {
      lista = JSON.parse(json);
    }
    lista.push(item);
    localStorage.setItem('cesta', JSON.stringify(lista));
    this.router.navigate(['/cesta']); 
  }
}