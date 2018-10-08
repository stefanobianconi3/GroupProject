import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { SharedFolder } from 'src/app/services/SharedFolder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() folderSelected = new EventEmitter();
  private models: any;
  private modelsPath: any;
  private folder: any;

  constructor(private http: HttpClientModule, private data: DataService, private sharedFolder: SharedFolder) { 
    
  }

  checkTokenValidity() {
    this.data.checkToken();
  }

  select(f) {
    this.models = f;
    this.folderSelected.emit(f);
  }

  modelChanged(data) {
    this.folder = [{
      name: localStorage.getItem('nome'),
      path: "/",
      type: "dir",
      children: data
    }];
  }

  ngOnInit() {
    this.checkTokenValidity();
    this.sharedFolder.getData().subscribe(
      (f) => {
        this.folder = f;
      }
    );
  }

}
