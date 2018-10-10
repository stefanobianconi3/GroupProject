import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'; 
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import {RouteGuardService} from 'src/app/services/route-guard.service';
import { SigninComponent } from '../components/signin/signin.component';
import { ModelerComponent } from '../components/modeler/modeler.component';


const routes: Routes = [
  {
    path:'homepage',
    component: HomePageComponent,
    //Classe o servizio che ritrona true o false per attivare la rotta
    canActivate: [RouteGuardService],

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
  path: 'signin',
  component: SigninComponent,
  canActivate: [RouteGuardService]
  },
  {
    path: 'modeler/:path/:version',
    component: ModelerComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'modeler/:path',
    component: ModelerComponent,
    canActivate: [RouteGuardService]
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

  declarations: [],
})
export class RoutingModuleModule {
  
 }
