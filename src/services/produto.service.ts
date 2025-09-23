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
  private bearerToken?: string; 
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
        this.bearerToken = localStorage.getItem('authToken') ?? undefined;
  }
  save(produto: Produto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Save`, produto);
  }

  all(): Observable<any> {
      let headers = {"Authorization": `Bearer ${localStorage!=undefined?localStorage.getItem('authToken'):''}`};
      return this.http.get(`${this.apiUrl}/All`,{headers: headers});
    
  }

  // Add more CRUD methods as needed (list, update, delete)
}