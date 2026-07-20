import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Bemvindo } from './bemvindo/bemvindo';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Bemvindo, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('web02');

  totalItens: number = 0;

 constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.atualizarCarrinho();
      }
    });
  }

  ngOnInit() {
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      
      setTimeout(() => {
        const json = localStorage.getItem('cesta');
        if (json) {
          const lista: any[] = JSON.parse(json);
          this.totalItens = lista.reduce((soma, item) => soma + item.quantidade, 0);

          this.cdr.detectChanges();
        }
      }, 0);
    }
  }
}
