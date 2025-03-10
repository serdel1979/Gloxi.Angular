import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { InfoProductoComponent } from './component/info-producto/info-producto.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {
        path: 'infoproducts',
        loadComponent: () => import('./pages/infoproducts/infoproducts.component').then(c => c.InfoproductsComponent),
        canActivate: [AuthGuard],
        children: [
          { path: 'list', loadComponent: ()=> import('./pages/infoproducts/list-infoproducts/list-infoproducts.component').then(c=> c.ListInfoproductsComponent)  },
          { path: 'add', loadComponent: () => import('./pages/infoproducts/addinfoproduct/addinfoproduct.component').then(c => c.AddinfoproductComponent) },
          { path: 'detail/:id', loadComponent: () => import('./pages/infoproducts/datil-infoproduct/datil-infoproduct.component').then(c => c.DatilInfoproductComponent) },
           { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'main', pathMatch: 'full' } 
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: '**', redirectTo: 'main' } 
];
  