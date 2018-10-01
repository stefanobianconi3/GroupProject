import { Component, OnInit,Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;
  @Output() modelChanged;
  private multipleVersion = false;
  private modelToOpen;
  private modelSelected;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.models = [];
  }

  private generateNewPath(oldPath: String, newName) {
    let array = oldPath.split("\\");
    array[array.length - 1] = newName;
    return array.join("\\");
  }

  private changeSlash(path) {
    console.log(path);
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

  selectModel(model){
    if(this.modelSelected){
      document.getElementById(this.modelSelected.name).style.backgroundColor = "#FFFFFF";
    }
    this.modelSelected = model;
    document.getElementById(model.name).style.backgroundColor = "#959191";
  }

  newModelReq(modelname) {
    if (this.models.path) {
      this.data.createModel(this.models.path + "\\" + modelname).subscribe(
        (payload) => {
          if (payload['success']) {
            let path = this.changeSlash(this.models.path);
            window.open("/modeler/" + path + "%5C" + modelname, '_blank');
          } else {
            console.log(payload['error'])
          }
        }
      )
    } else {
      alert("Impossibile creare nella cartella di root")
    }
  }

  modifyModelReq(newModelName){
    if(this.modelSelected){
      this.data.modifyModel(this.modelSelected.path, this.generateNewPath(this.modelSelected.path, newModelName)).subscribe(
        (payload) => {
          if(payload['success']){
            window.location.reload(true);
          } else {
            console.log(payload['error'])
          }
        }
      )
    }
  }

  deleteModelReq(){
    if(this.modelSelected){
      this.data.deleteModel(this.modelSelected.path).subscribe(
        (payload) => {
          if(payload['success']){
            window.location.reload(true);
          } else {
            console.log(payload['error'])
          }
        }
      )
    }
  }

  getVersion(model){
    let i = model['children'].length-1;
    return model['children'][i].name.replace(".xml", "");
  }

  openModel(model?, version?){
    if (model) {
      let path = this.changeSlash(model.path);
      if(version){
        window.open("/modeler/"+path+"/"+version, '_blank');
      } else {
        window.open("/modeler/"+path, '_blank');
      }
    } else {
      let path = this.changeSlash(this.modelToOpen.path);
      if(version){
        window.open("/modeler/"+path+"/"+version, '_blank');
      } else {
        window.open("/modeler/"+path, '_blank');
      }
    }
  }

  chooseVersion(model){
    if(model.children.length == 1){
      this.openModel(model);
      this.multipleVersion = false;
    } else {
      this.modelToOpen = model;
      this.multipleVersion = true;
    }
  }

}
