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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'; 
import { NewProductDialog } from './new/new-product-modal';
import { DeleteProductDialog } from './delete/delete-product-modal';
 

@Component({
  imports: [ 
    MatIcon, 
    MatIconModule, 
    MatCardActions,  
    MatTableModule,   
    MatCheckboxModule, 
    MatGridListModule , 
    FormsModule, 
    MatRadioModule, 
    FormsModule,
    HttpClientModule,
    MatCard ,
    MatCardTitle,
    MatCardContent,
    MatInputModule,
    CommonModule,
    MatToolbarModule, 
    MatIcon, 
    MatRadioModule, 
    
    
    MatFormFieldModule, 
    MatButtonModule,
    MatDividerModule,
    
  ],
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
     this.dialog.open(NewProductDialog, {
      data : this.produto
    }).afterClosed().subscribe({
      next: (res: any) =>  {
        this.load().subscribe({});
      }
    })
  }
  delete(p: Produto ) {
    console.log(p);
    this.produto = p;
     this.dialog.open(DeleteProductDialog, {
      data : this.produto
    }).afterClosed().subscribe({
      next: (res: any) =>  {
        this.load().subscribe({});
      }
    })
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
