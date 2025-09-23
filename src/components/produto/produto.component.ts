import { Component } from '@angular/core'; 
import { Produto, ProdutoService } from '../../services/produto.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule 
import { MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  imports: [ MatTableModule, MatHeaderCellDef,MatCellDef,MatRowDef,MatHeaderRowDef,MatHeaderCellDef,MatHeaderCellDef,MatCellDef, MatCheckboxModule, MatGridListModule , FormsModule, MatRadioModule, FormsModule,HttpClientModule,MatCard ,MatCardTitle,MatCardContent,MatFormField,MatLabel,MatFormField,MatCardActions,MatInputModule,MatFormFieldModule, CommonModule],
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
    estoqueAtual: 0,
  };
  message = '';
    createTable() {
     
    this.dataSource = new MatTableDataSource(this.Resultset);
    //this.dataSource.sort = this.sort;
  }
  dataSource: any;
  constructor(private produtoService: ProdutoService) {}
  Resultset : Produto[] = [];
  save() {
    this.produtoService.save(this.produto).subscribe({
      next: () => this.message = 'Produto salvo com sucesso!',
      error: () => this.message = 'Erro ao salvar produto.'
    });
  }
  ngOnInit() {
    this.produtoService.all().subscribe({
      next: (response) => {
        console.log(response.data);
        this.Resultset = [...this.Resultset, ...response.data]; 
        console.log(this.Resultset);
      },
      error: (error) => console.error('There was an error!', error)
    });
  }
  select(p: Produto ) {
    console.log(p);
    this.produto = p;
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