import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  
  private url = 'http://127.0.0.1:8080/api/pedido'; 

  constructor(private http: HttpClient) { }

  // Envia o objeto inteiro e recebe o pedido de volta 
  gravar(obj: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, obj);
  }
}