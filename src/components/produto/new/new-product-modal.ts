import { Component, inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule 
import { MatTableModule } from '@angular/material/table';
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
import { Produto, ProdutoService } from '../../../services/produto.service';
 

@Component({
  selector: 'new-product-dialog',
  templateUrl: 'new-product-modal.html',
  imports: [ 
    MatToolbarModule, 
    MatTableModule,  
    MatIcon, 
    MatIconModule, 
    MatCheckboxModule, 
    MatGridListModule , 
    FormsModule, 
    MatRadioModule, 
    FormsModule, 
    MatCard ,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatFormField,
    MatCardActions,
    MatInputModule,
    MatFormFieldModule, 
    CommonModule, 
    MatIconModule, 
    MatIcon, 
    CommonModule, 
    MatIcon, 
    CommonModule, 
    MatButtonModule,
    MatDividerModule,
    MatIconModule
     
            
  ],
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
  
  constructor(private produtoService: ProdutoService) {
    if (this.data!=null)
      this.produto = this.data;
  }
  save(): Observable<boolean> {
    this.produtoService.save(this.produto).subscribe({
      next: () => {
        this.message = 'Produto salvo com sucesso!'; 
        
        this.dialogRef.close();
        return this._isSaved.asObservable();
      },
      error: () => this.message = 'Erro ao salvar produto.'
    });
    return this._isSaved.asObservable();
  }
  close() {
        this.dialogRef.close();
  }
}