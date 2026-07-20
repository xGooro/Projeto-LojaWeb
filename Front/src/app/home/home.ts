import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  
  lista: Produto[] = [];

  constructor(
    private service: ProdutoService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.carregarDestaques();
  }

  carregarDestaques() {
    this.service.carregarDestaques().subscribe({
      next: (retorno: Produto[]) => {
        this.lista = retorno;
        this.cdr.detectChanges(); 
      },
      error: (erro: any) => {
        console.error("Erro ao carregar destaques na Home:", erro);
      }
    });
  }

  redirecionar(obj: Produto) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('ProdutoSelecionado', JSON.stringify(obj));
    }
    this.router.navigate(['/detalhe']);
  }
}