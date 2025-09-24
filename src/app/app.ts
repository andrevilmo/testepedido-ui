import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpErrorInterceptor } from './http-errors-inteceptors';
 import { MatTableModule } from '@angular/material/table'
import { ProdutoComponent } from '../components/produto/produto.component';
import { AuthService } from './auth.service';
import { HomeComponent } from '../components/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('uiteste');
  isLogged: boolean = false;
  constructor(public authService: AuthService) {
    this.isLogged = authService.isLoggedIn;
  }
}

@NgModule({
  imports: [BrowserModule,
    ProdutoComponent,
    LoginComponent,
    HttpClientModule, 
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule
  ],
  providers: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  bootstrap: [App]
})

export class AppModule {}
