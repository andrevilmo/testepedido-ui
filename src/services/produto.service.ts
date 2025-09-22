import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  sku: string;
  nome: string;
  precoBase: number;
  ativo: boolean;
  estoqueAtual: number;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:5000/api/Produto';

  constructor(private http: HttpClient) {}

  save(produto: Produto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Save`, produto);
  }

  // Add more CRUD methods as needed (list, update, delete)
}