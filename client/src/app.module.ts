import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'; 
import { AppComponent } from './app/components/app/app.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { HomePageComponent } from './app/components/home-page/home-page.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { RoutingModuleModule } from 'src/app/routing-module.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RoutingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
