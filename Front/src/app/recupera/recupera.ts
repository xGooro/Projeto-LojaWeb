import { Component , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recupera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recupera.html',
  styleUrl: './recupera.css',
})
export class Recupera {
  mensagem: string = "";
  obj: Cliente = new Cliente();

  constructor(private service: ClienteService,private router: Router, private cdr: ChangeDetectorRef) {}

  recuperarSenha() {
  this.service.recuperarSenha(this.obj.email).subscribe({
    next: (resposta: any) => {
      if (resposta === "Sucesso") {
        this.mensagem = "E-mail enviado! Você será redirecionado em breve...";
        this.cdr.detectChanges();

        // 3. Aguarda 2,5 segundos e redireciona para Login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      } else {
        this.mensagem = "Email não encontrado em nosso sistema.";
      }
    },
    error: () => {
      this.mensagem = "Erro ao conectar com o servidor.";
    }
  });
  }


}
