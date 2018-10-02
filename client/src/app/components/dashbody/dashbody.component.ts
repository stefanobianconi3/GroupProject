import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver/dist/FileSaver';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;
  @Output() modelChanged = new EventEmitter();
  private multipleVersion = false;
  private modelToOpen;
  private modelSelected;
  private uploadModelDuplicated = false;
  private file;
  private fileName;
  private fileContent;

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

  private emitChanges(data) {
    this.modelChanged.emit(data);
    this.models = [];
    this.modelSelected = undefined;
  }

  private uploadModel() {
    this.data.createModel(this.models.path + "\\" + this.fileName).subscribe(
      (payload) => {
        if (payload['success']) {
          this.data.saveModel(this.models.path + "\\" + this.fileName, 0, this.fileContent).subscribe(
            (data) => {
              this.emitChanges(payload['data']);
              //window.location.reload(true);
            }
          );
        }
      }
    );
  }

  selectModel(model) {
    if (this.modelSelected) {
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
            this.emitChanges(payload['data']);
          } else {
            console.log(payload['error'])
          }
        }
      )
    } else {
      alert("Impossibile creare nella cartella di root")
    }
  }

  modifyModelReq(newModelName) {
    if (this.modelSelected) {
      this.data.modifyModel(this.modelSelected.path, this.generateNewPath(this.modelSelected.path, newModelName)).subscribe(
        (payload) => {
          if (payload['success']) {
            this.emitChanges(payload['data']);
          } else {
            console.log(payload['error'])
          }
        }
      )
    }
  }

  deleteModelReq() {
    if (this.modelSelected) {
      this.data.deleteModel(this.modelSelected.path).subscribe(
        (payload) => {
          if (payload['success']) {
            this.emitChanges(payload['data']);
          } else {
            console.log(payload['error'])
          }
        }
      )
    }
  }

  export() {
    if (this.modelSelected) {
      this.data.getModel(this.modelSelected.path, this.getVersion(this.modelSelected)).subscribe(
        (payload) => {
          const content = payload['data'];
          const blob = new Blob([payload['data']], { type: 'text/bpmn' });
          saveAs(blob, this.modelSelected.name+'.bpmn');
        }
      )
    }
  }

  import() {
    if (this.models.path) {
      document.getElementById("upload").click();
    }
  }

  handleFileInput(files: FileList) {
    let starter = false;
    this.uploadModelDuplicated = false;
    this.file = files[0];
    this.fileName = this.file.name.replace('.bpmn', '');
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      //Il file è pronto
      this.fileContent = e['explicitOriginalTarget'].result;
      for (let i = 0; i < this.models['children'].length; i++) {
        if (this.models['children'][i].name == this.fileName) {
          this.uploadModelDuplicated = true;
          break;
        }
      }
      if (this.uploadModelDuplicated) {
        alert("Cannot upload model. Another model with the same name found");
      } else {
        this.uploadModel();
      }
    }
    fileReader.readAsText(this.file);
  }

  getVersion(model) {
    let i = model['children'].length - 1;
    return model['children'][i].name.replace(".xml", "");
  }

  openModel(model?, version?) {
    if (model) {
      let path = this.changeSlash(model.path);
      if (version) {
        window.open("/modeler/" + path + "/" + version, '_blank');
      } else {
        window.open("/modeler/" + path, '_blank');
      }
    } else {
      let path = this.changeSlash(this.modelToOpen.path);
      if (version) {
        window.open("/modeler/" + path + "/" + version, '_blank');
      } else {
        window.open("/modeler/" + path, '_blank');
      }
    }
  }

  chooseVersion(model) {
    if (model.children.length == 1) {
      this.openModel(model);
      this.multipleVersion = false;
    } else {
      this.modelToOpen = model;
      this.multipleVersion = true;
    }
  }

}
