import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModelerComponent } from 'src/app/components/modeler/modeler.component';
import { DashbodyComponent } from 'src/app/components/dashbody/dashbody.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    DashboardComponent,
    SigninComponent,
    ModelerComponent,
    DashbodyComponent,
    FolderComponent,
    SidenavComponent
  ],

  imports: [
    BrowserModule,
    RoutingModuleModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],

  providers: [AuthService],

  schemas: [ NO_ERRORS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
