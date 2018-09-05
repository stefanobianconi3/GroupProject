import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;
  private multipleVersion = false;
  private model;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.models = [];
  }

  createNewModel(modelname){
    this.data.createModel(modelname).subscribe(
      (payload) => {
        if (payload['success']) {
          console.log('nuovo model creato')
        } else {
          console.log(payload['error'])
        }
      }
    )
  }

  getVersion(model){
    let i = model['children'].length-1;
    return model['children'][i].name.replace(".xml", "");
  }

  openModel(model?, version?){
    if(model){
      let path = model.path.replace(/\//g, "%5C").replace(/\\/, "%5C");
      if(version){
        window.open("/modeler/"+path+"/"+version, '_blank');
      } else {
        window.open("/modeler/"+path, '_blank');
      }
    } else {
      let path = this.model.path.replace(/\//g, "%5C").replace(/\\/, "%5C");
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
      this.model = model;
      this.multipleVersion = true;
    }
  }

}
