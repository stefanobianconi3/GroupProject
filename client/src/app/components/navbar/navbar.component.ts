import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from '../../services/data.service';
import { SharedFolder } from '../../services/SharedFolder';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Input() folderSelect;
  private showNavbar = true;
  private nome = localStorage.getItem('nome') ;
  private isLogged:boolean =false;
  private fail : boolean = false;
  private errore: String;
  private newUser:boolean=false;
  private file;
  private fileName;
  private fileContent;

  constructor(private route: Router, private auth: AuthService, private data: DataService, private sharedFolder: SharedFolder) { 
    
    this.checkUrlInstance(window.location.href.split("/"));
    
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

  ngOnInit() {
    this.isLogged=this.auth.isLoggedIn();
    this.folderSelect = [];
  }

  private changeSlash(path) {
    let newPath = "";
    for (let i = 0; i < path.length; i++) {
      if (path[i] == "\\" || path[i] == "/") {
        newPath = newPath + "%5C";
      } else {
        newPath = newPath + path[i];
      }
    }
    return newPath;
  }

  private checkModelDuplicates() {
    for (let i = 0; i < this.folderSelect['children'].length; i++) {
      if (this.folderSelect['children'][i].name == this.fileName) {
        return true;
      }
    }
    return false;
  }
  
  private uploadModel() {
    this.data.createModel(this.folderSelect.path + "\\" + this.fileName).subscribe(
      (payload) => {
        if (payload['success']) {
          this.data.saveModel(this.folderSelect.path + "\\" + this.fileName, 0, this.fileContent).subscribe(
            (data) => {
              let folder = [{
                name: localStorage.getItem('nome'),
                path: "/",
                type: "dir",
                children: payload['data']
              }];
              this.sharedFolder.setData(folder);
            }
          );
        }
      }
    );
  }

  private checkUrlInstance(urlArray){
    for(let i=0; i<urlArray.length; i++){
      if(urlArray[i].includes("modeler")){
        this.showNavbar = false;
        break;
      }
    }
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

import() {
  if (this.folderSelect.path) {
    document.getElementById("upload").click();
  }
}

handleFileInput(files: FileList) {
  this.file = files[0];
  this.fileName = this.file.name.replace('.bpmn', '');
  let fileReader = new FileReader();
  fileReader.onloadend = (e) => {
    //Il file è pronto
    this.fileContent = e['srcElement']['result'];
    if (this.checkModelDuplicates()) {
      alert("Cannot upload model. Another model with the same name found");
    } else {
      this.uploadModel();
    }
  }
  fileReader.readAsText(this.file);
}

}
