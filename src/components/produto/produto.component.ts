import { Component } from '@angular/core'; 
import { Produto, ProdutoService } from '../../services/produto.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  imports: [ FormsModule,HttpClientModule,MatCard ,MatCardTitle,MatCardContent,MatFormField,MatLabel,MatFormField,MatCardActions,MatInputModule,MatFormFieldModule, CommonModule],
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {
  produto: Produto = {
    id: 0,
    sku: '',
    nome: '',
    precoBase: 0,
    ativo: true,
    estoqueAtual: 0
  };
  message = '';

  constructor(private produtoService: ProdutoService) {}

  save() {
    this.produtoService.save(this.produto).subscribe({
      next: () => this.message = 'Produto salvo com sucesso!',
      error: () => this.message = 'Erro ao salvar produto.'
    });
  }

  reset() {
    this.produto = {
      id: 0,
      sku: '',
      nome: '',
      precoBase: 0,
      ativo: true,
      estoqueAtual: 0
    };
    this.message = '';
  }
}