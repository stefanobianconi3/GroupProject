import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router'; 
import { AppComponent } from './app/components/app/app.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { HomePageComponent } from './app/components/home-page/home-page.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { RoutingModuleModule } from 'src/app/routing-module.module';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    DashboardComponent,
    SigninComponent,
  
  ],

  imports: [
    BrowserModule,
    RoutingModuleModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
