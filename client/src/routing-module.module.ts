import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'; 
import { AppComponent } from 'src/app/components/app/app.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'homepage',
    component: HomePageComponent,

  },
  {
    path: 'homepage/dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class RoutingModuleModule {
  
 }
