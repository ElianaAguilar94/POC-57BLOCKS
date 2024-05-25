import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { authGuard } from './core/auth.guard';
import { DetailComponent } from './screens/detail/detail.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', 
        loadComponent: () => import('./screens/home/home.component').then((m) => m.HomeComponent),
        canActivate: [authGuard],
    },
    { path: 'detail/:id', component: DetailComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];
