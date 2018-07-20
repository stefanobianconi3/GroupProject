import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
private nome = this.getNome();
  constructor(private http: HttpClientModule) { }
  
  getNome(){
    return localStorage.getItem('nome')
    }
  
  ngOnInit() {
  }

}
