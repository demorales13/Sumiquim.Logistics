import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m=>m.AuthModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m=>m.LoginModule),
        canActivate: [NoAuthGuard],
      },
      {
        path: "",
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  },
  {
    // En caso de que no encuentre ninguna ruta valida
    path: '**',
    redirectTo: 'auth/static/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
