import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Promotion {
  id: number;
  sku: string;
  nome: string;
  precoBase: number;
  ativo: boolean;
  estoqueAtual: number;
}

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private apiUrl = 'http://localhost:5000/api/Promocao';
  private bearerToken?: string; 
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
        this.bearerToken = localStorage.getItem('authToken') ?? undefined;
  }
  save(promotion: Promotion): Observable<any> {
    let headers = {"Authorization": `Bearer ${localStorage!=undefined?localStorage.getItem('authToken'):''}`};
    return this.http.post(`${this.apiUrl}/Save`, promotion,{headers: headers});
  }

  all(): Observable<any> {
      let headers = {"Authorization": `Bearer ${localStorage!=undefined?localStorage.getItem('authToken'):''}`};
      return this.http.get(`${this.apiUrl}/All`,{headers: headers});
  }

  // Add more CRUD methods as needed (list, update, delete)
}