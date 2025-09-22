import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ProdutoComponent } from '../components/produto/produto.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard]  }
];
