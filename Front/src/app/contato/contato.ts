import { Component ,ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-contato',
  imports: [FormsModule, CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  public mensagem: string = "";
  public titulo: string = "";
  public nome: string = "";
  public telefone: string = "";
  public email: string = "";
  public texto: string = "";
  public copia: boolean = false;

  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService,private router: Router, private cdr: ChangeDetectorRef) {}

  enviar() {
    let dados = {
      titulo: this.titulo,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      texto: this.texto,
      copia: this.copia
    };

    this.service.enviarContato(dados).subscribe({
    next: () => {
      this.mensagem = "Mensagem enviada com sucesso! Redirecionando...";
      this.cdr.detectChanges();
      
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2500);
    },
    error: () => {
      this.mensagem = "Erro ao enviar mensagem.";
    }
  });
  }

}
