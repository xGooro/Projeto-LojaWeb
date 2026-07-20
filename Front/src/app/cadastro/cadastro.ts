import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()]
  
})
export class Cadastro implements OnInit {
  mensagem: string = "";
  obj: Cliente = new Cliente();
  tituloAcao: string = "Preencha o formulário para realizar seu cadastro";
  atualizando: boolean = false; // Variável para sabermos se é POST ou PUT

  constructor(
    private service: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let json = localStorage.getItem("Cliente");
      // Se já tem um cliente logado, a tela vira uma "Edição de Perfil"
      if (json != null) {
        this.obj = JSON.parse(json);
        this.tituloAcao = "Atualize o seu cadastro";
        this.atualizando = true; 
      }
    }
  }

  cadastrar() {
    if (this.atualizando) {
      // FLUXO 1: ATUALIZAR CLIENTE (PUT)
      
      this.service.alterar(this.obj).subscribe({
        next: (retorno) => {
          this.mensagem = "Cadastro atualizado com sucesso!";
          // Atualiza a "memória" do navegador com as informações novas
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("Cliente", JSON.stringify(this.obj));
          }
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error("Erro na alteração:", erro);
          this.mensagem = "Erro ao atualizar os dados. Tente novamente.";
          this.cdr.detectChanges();
        }
      });

    } else {
      // NOVO CADASTRO (POST)
      
      this.service.gravar(this.obj).subscribe({
        next: (retorno) => {
          this.mensagem = "Cadastro realizado com sucesso! Verifique sua caixa de email.";
          this.cdr.detectChanges();
          
          // Aguarda 2,5 segundos e manda ele pro Login
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2500);
        },
        error: (erro) => {
          console.error("Erro no cadastro:", erro);
          this.mensagem = "Erro ao realizar o cadastro. O email já pode estar em uso.";
          this.cdr.detectChanges();
        }
      });
    }
  }
}