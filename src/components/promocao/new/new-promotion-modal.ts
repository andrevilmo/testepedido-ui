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
import { Promotion, PromotionService } from '../../../services/promotion.service';
 

@Component({
  selector: 'new-promotion-dialog',
  templateUrl: 'new-promotion-modal.html',
  styleUrl: 'new-promotion-modal.scss',
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
export class NewPromotionDialog {
  data = inject(MAT_DIALOG_DATA);
  message = '';
  promotion: Promotion = {
    id: 0,
    sku: '',
    nome: '',
    precoBase: 0,
    ativo: true,
    estoqueAtual: 0,
  };

    private _isSaved = new BehaviorSubject<boolean>(false);
    _isSaved$: Observable<boolean> = this._isSaved.asObservable();

  readonly dialogRef = inject(MatDialogRef<NewPromotionDialog>);
  
  constructor(private promotionService: PromotionService) {
    if (this.data!=null)
      this.promotion = this.data;
  }
  save(): Observable<boolean> {
    this.promotionService.save(this.promotion).subscribe({
      next: () => {
        this.message = 'Promotion salvo com sucesso!'; 
        
        this.dialogRef.close();
        return this._isSaved.asObservable();
      },
      error: () => this.message = 'Erro ao salvar promotion.'
    });
    return this._isSaved.asObservable();
  }
  close() {
        this.dialogRef.close();
  }
}