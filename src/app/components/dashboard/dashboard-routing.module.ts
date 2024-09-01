import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
      path: '', 
      component: DashboardComponent,
      children: [
        { path: 'detalhes/:id', component: DetailsComponent },
        { path: 'home', component: HomeComponent }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
