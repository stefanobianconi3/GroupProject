import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;

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

}
