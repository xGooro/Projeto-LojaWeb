import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    mensagem: string = "";
    obj: Cliente = new Cliente();

    // Injetamos o Router e o ClienteService
    constructor(private router: Router, private service: ClienteService) {}

    fazerLogin() {
      // Chama o banco de dados passando o email e a senha digitados
      this.service.fazerLogin(this.obj).subscribe({
        next: (retorno: Cliente) => {
          // O Spring Boot retorna o código > 0 se achar o cliente
          if (retorno.codigo && retorno.codigo > 0) {
            
            // Salva o cliente logado no navegador (Protegido para SSR)
            if (typeof window !== 'undefined' && localStorage) {
              localStorage.setItem("Cliente", JSON.stringify(retorno));
            }
            
            // Navega para a Home de forma instantânea, sem piscar a tela!
            this.router.navigate(['/']); 
            
          } else {
            this.mensagem = "Email ou senha incorretos!";
          }
        },
        error: (erro: any) => {
          console.error("Erro no login:", erro);
          this.mensagem = "Erro ao conectar com o servidor.";
        }
      });
    }

    novoCadastro() {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.removeItem("Cliente");
      }
      // Navegação rápida para a tela de cadastro
      this.router.navigate(['/cadastro']);  
    }
}