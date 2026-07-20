import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cliente } from '../model/cliente';
import { Router, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-bemvindo',
  standalone: true,
  imports: [],
  templateUrl: './bemvindo.html',
  styleUrl: './bemvindo.css',
})
export class Bemvindo implements OnInit {
  mensagem: string = "Olá, faça seu login!";
  obj: Cliente = new Cliente();
  estaLogado: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarStatus();
      }
    });
  }

  ngOnInit() {
    this.verificarStatus();
  }

  verificarStatus() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        let json = localStorage.getItem("Cliente");
        
        if (json != null) {
          this.obj = JSON.parse(json);
          this.estaLogado = true;
          this.mensagem = `Olá, ${this.obj.nome}, Clique aqui para sair`;
        } else {
          this.estaLogado = false;
          this.mensagem = "Olá, faça seu login!";
        }
        
        
        this.cdr.detectChanges(); 
      }, 0);
    }
  }

  executarAcao() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.estaLogado) {
        localStorage.removeItem("Cliente"); 
        this.verificarStatus(); 
        this.router.navigate(['/']); 
      } else {
        this.router.navigate(['/login']); 
      }
    }
  }
}