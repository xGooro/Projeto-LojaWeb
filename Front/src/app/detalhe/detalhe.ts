import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';
import { ProdutoService } from '../service/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe implements OnInit {
    obj: Produto = new Produto();
    mensagem: string = "";

    constructor(
        private service: ProdutoService, 
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        private cdr: ChangeDetectorRef // 👈 A ferramenta mágica que atualiza a tela
    ) {}

    ngOnInit() {
      // Garante de forma segura que só vai buscar dados quando estiver no navegador
      if (isPlatformBrowser(this.platformId)) {
        this.carregar();
      }
    }

    carregar() {
      let json = localStorage.getItem("ProdutoSelecionado");
      
      if (json != null) {
        let produtoSalvo = JSON.parse(json);
        
        this.service.carregarDetalhe(produtoSalvo.codigo).subscribe({
          next: (retorno: Produto) => {
            this.obj = retorno;
            
            // 👈 OBRIGA O ANGULAR A DESENHAR A TELA AGORA MESMO
            this.cdr.detectChanges(); 
          },
          error: (erro: any) => {
            console.error("ERRO:", erro);
            this.mensagem = "Erro ao conectar com o servidor.";
            this.cdr.detectChanges();
          }
        });
      } else {
        this.mensagem = "Nenhum produto selecionado. Volte para a vitrine!";
      }
    }

    adicionarItemCesta(obj: Produto) {
        let json = localStorage.getItem('cesta');
        let lista: ItemCesta[] = [];
        let item: ItemCesta = new ItemCesta();
        
        item.produto = obj;
        item.quantidade = 1;
        item.valor = (obj.promo < obj.valor) ? obj.promo : obj.valor; 
    
        if (json != null) {
          lista = JSON.parse(json);
        }
        
        lista.push(item);
        localStorage.setItem('cesta', JSON.stringify(lista));
        
        this.router.navigate(['/cesta']);
    }
}