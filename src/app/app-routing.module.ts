import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'pt/login', pathMatch: 'full' },
  { path: 'pt/login', component: LoginComponent },
  { path: 'en/login', component: LoginComponent },
  {
    path: 'itau', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
