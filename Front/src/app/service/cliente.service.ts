import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Lembre-se de usar 127.0.0.1 para evitar o conflito de SSR!
  private url = 'http://127.0.0.1:8080/api/cliente'; 

  constructor(private http: HttpClient) { }

  // Chama o @PostMapping do Spring Boot
  fazerLogin(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/fazerLogin`, obj);
  }

  gravar(obj: Cliente): Observable<any> {
    return this.http.post<any>(this.url, obj);
  }

  alterar(obj: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, obj);
  }

  enviarContato(obj: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8080/api/email/contato', obj);
  }

  recuperarSenha(email: string): Observable<any> {
    return this.http.post('http://127.0.0.1:8080/api/email/recuperar', { email });
  }
}