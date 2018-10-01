import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { Folder } from '../../classes/Folder'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private models: any;
  private modelsPath: any;
  private folder: any;

  constructor(private http: HttpClientModule, private data: DataService) { }

  checkTokenValidity() {
    this.data.checkToken();
  }

  select(f) {
    this.models = f;
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
  }

}
