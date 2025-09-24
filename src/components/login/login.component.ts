import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../app/auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
  imports: [ 
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatCard ,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatFormField,
    MatCardActions,
    MatInputModule,
    MatFormFieldModule, 
    CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient,public authService: AuthService,private router: Router) {}

  login() {
    this.http.post('http://localhost:5000/api/Login/Auth', {
      user: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) =>  {
        console.log('LOGIN OK');
        this.authService.login(res.data,res.role).subscribe({
          next: () => {
            this.router.navigate(["/home"]);
          },
          error: () => {
            this.message = 'Login failed!';
          }
        });

      },
      error: (err) => this.message = 'Login failed!'
    });
  }
}