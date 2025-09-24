import { Component, inject } from '@angular/core'; 
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
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {     MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  
  
} from '@angular/material/dialog';
import {MatIcon, MatIconModule} from '@angular/material/icon';

// Removed duplicate Produto class declaration, using imported Produto type/interface instead.

@Component({
  imports: [ MatIcon, MatIconModule,  MatTableModule,   MatCheckboxModule, MatGridListModule , FormsModule, MatRadioModule, FormsModule,HttpClientModule,MatCard ,MatCardTitle,MatCardContent,MatInputModule,CommonModule],
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
  }
  dataSource: any;
  dialog = inject(MatDialog);
  Resultset : Produto[] = [];
  private _isLoaded = new BehaviorSubject<boolean>(false);
  _isLoaded$: Observable<boolean> = this._isLoaded.asObservable();

  constructor(private produtoService: ProdutoService) {}
  
  load(): Observable<boolean> {
    this.produtoService.all().subscribe({
      next: (response) => {
        console.log(response.data);
        this.Resultset = [...response.data]; 
        console.log(this.Resultset);
        return this._isLoaded.asObservable(); 
      },
      error: (error) => console.error('There was an error!', error)
    });
    return this._isLoaded.asObservable(); 
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
  openDialog() {
    this.dialog.open(NewProductDialog, {
      
    }).afterClosed().subscribe({
      next: (res: any) =>  {
        this.load().subscribe({});
      }
    })
  }
}

@Component({
  selector: 'new-product-dialog',
  templateUrl: 'new-product-modal.html',
  imports: [ MatTableModule,  MatIcon, MatIconModule, MatCheckboxModule, MatGridListModule , FormsModule, MatRadioModule, FormsModule,HttpClientModule,MatCard ,MatCardTitle,MatCardContent,MatFormField,MatLabel,MatFormField,MatCardActions,MatInputModule,MatFormFieldModule, CommonModule],
})
export class NewProductDialog {
  data = inject(MAT_DIALOG_DATA);
  message = '';
  produto: Produto = {
    id: 0,
    sku: '',
    nome: '',
    precoBase: 0,
    ativo: true,
    estoqueAtual: 0,
  };

    private _isSaved = new BehaviorSubject<boolean>(false);
    _isSaved$: Observable<boolean> = this._isSaved.asObservable();

  readonly dialogRef = inject(MatDialogRef<NewProductDialog>);
  
  constructor(private produtoService: ProdutoService) {}
  save(): Observable<boolean> {
    this.produtoService.save(this.produto).subscribe({
      next: () => {
        this.message = 'Produto salvo com sucesso!'; 
        
        this.dialogRef.close();
        return this._isSaved.asObservable();
        /*this.load().subscribe({next:()=>this.message='Lista atualizada',error:()=>this.message='Erro ao carregar lista'});*/ 
      },
      error: () => this.message = 'Erro ao salvar produto.'
    });
    return this._isSaved.asObservable();
  }
   close(): Observable<boolean> {
    return this._isSaved.asObservable();
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
  }
}