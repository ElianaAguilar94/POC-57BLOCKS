import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', 
        loadComponent: () => import('./screens/home/home.component').then((m) => m.HomeComponent),
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: '/login' }
];
