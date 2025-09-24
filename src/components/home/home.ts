import { Component } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import { ProdutoComponent } from '../produto/produto.component';
import { CommonModule } from '@angular/common';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider';
  
@Component({
  selector: 'app-home',
  imports: [MatIconModule, MatIcon, ProdutoComponent,CommonModule,CdkMenuTrigger, CdkMenu, CdkMenuItem,MatButtonModule,MatDividerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  
  isLogged: boolean = false;
  role: string = "operador";
  public isLoggedIn = () =>
    this.isLogged;
  public isOperador = () => 
    localStorage.getItem('role')!=null?
    localStorage.getItem('role')!.toLowerCase().trim()==="operador":"";
  public isAdmin = () => 
    localStorage.getItem('role')!=null?
    localStorage.getItem('role')!.toLowerCase().trim()==="admin":"";
  public logout = () =>
    this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['login']);
          },
          error: () => {
            
          }
        });
  constructor(public authService: AuthService, public router : Router) {
    this.isLogged = authService.isLoggedIn;
    this.role = authService.role;
  }
}
