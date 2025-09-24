import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProdutoComponent } from '../components/produto/produto.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from '../components/home/home';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard]  }
];
