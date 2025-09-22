import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
@Component({
  imports: [ FormsModule,HttpClientModule,MatCard ,MatCardTitle,MatCardContent,MatFormField,MatLabel,MatFormField,MatCardActions,MatInputModule,MatFormFieldModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient,public authService: AuthService) {}

  login() {
    this.http.post('http://localhost:5000/api/Login/Auth', {
      user: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) =>  this.authService.login(res.data),
      error: (err) => this.message = 'Login failed!'
    });
  }
}