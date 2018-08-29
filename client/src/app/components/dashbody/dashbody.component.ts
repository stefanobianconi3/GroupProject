import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;
  @Input() modelsPath;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.models = [];
  }

  generatePath(name){
    return this.modelsPath + "\\" + "\\" + name;
  }

  createNewModel(modelname){
    this.data.createModel(this.modelsPath+"//"+"//"+modelname).subscribe(
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

}
