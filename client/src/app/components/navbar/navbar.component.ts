import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharedFolder } from '../../services/SharedFolder';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() folderSelect;
private nome = localStorage.getItem('nome') ;
private isLogged:boolean =false;
private fail : boolean = false;
private errore: String;
private newUser:boolean=false;
  constructor(private route: Router, private auth: AuthService, private data: DataService, private sharedFolder: SharedFolder) { 
    auth.outLogin.subscribe(
      () => {
        this.isLogged=true;
    });
    auth.outSignin.subscribe(
      () => {
        this.newUser=true;
    });
    auth.outLogout.subscribe(
      () => {
        this.isLogged=false;
    });
    auth.errorLogin.subscribe(
      (errore) => {
        this.fail=true;
        this.errore=errore;

      });
    data.outLogout.subscribe(
      () => {
        this.isLogged = false;
      }
    )
  }

  private changeSlash(path) {
    let newPath = "";
    for (let i = 0; i < path.length; i++) {
      if (path[i] == "\\") {
        newPath = newPath + "%5C";
      } else {
        newPath = newPath + path[i];
      }
    }
    return newPath;
  }

logIn(form: NgForm){
  this.auth.login(form.value.email, form.value.password);
}

signin(form){
  form.reset();
  this.route.navigate(['signin']);
}

logout(e, form){
  this.auth.logout();
  this.route.navigate(['homepage']);
  
  e.preventDefault();
}

newModelReq(model){
  this.data.createModel(this.folderSelect.path + "\\" + model).subscribe(
    (payload) => {
      if(payload['success']){
        let path = this.changeSlash(this.folderSelect.path);
        window.open("/modeler/" + path + "%5C" + model, '_blank');
        let folder = [{
          name: localStorage.getItem('nome'),
          path: "/",
          type: "dir",
          children: payload['data']
        }];
        this.sharedFolder.setData(folder);
      }
    }
  );
}

ngOnInit() {
  this.isLogged=this.auth.isLoggedIn();
  this.folderSelect = [];
}

}
