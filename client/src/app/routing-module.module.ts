import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'; 
import { AppComponent } from 'src/app/components/app/app.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import {RouteGuardService} from 'src/app/route-guard.service';
import { SigninComponent } from './components/signin/signin.component';
const routes: Routes = [
  {
    path:'homepage',
    component: HomePageComponent,

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService]//classe o servizio che deve implementare che ritrona true o false per attivare la rotta
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
  path: 'signin',
  component: SigninComponent
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

  providers:[
    RouteGuardService
  ],
})
export class RoutingModuleModule {
  
 }