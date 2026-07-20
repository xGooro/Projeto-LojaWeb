import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = 'http://127.0.0.1:8080/api';  

  constructor(private http: HttpClient) { }

  //busca as camisetas da vitrine
  carregarVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produtos`);
  }

  // Busca apenas os destaques
  carregarDestaques(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produto/destaques`);
  }

  //busca uma camiseta específica
  carregarDetalhe(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/produto/${codigo}`);
  }
}
export { Produto };

