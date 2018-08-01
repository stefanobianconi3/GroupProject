import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
private nome = this.getNome();
private side:boolean = true;
private folder;

  constructor(private http: HttpClientModule, private data: DataService) { }
  
  getNome(){
    return localStorage.getItem('nome')
  }
  openNav(){
    
    document.getElementById('miaNav').style.width="250px";
    document.getElementById('miaDash').style.marginLeft="320px";
    document.getElementById('miaDash').style.width="77.5%";
    this.side=false;
    
  }

  closeNav(){
    document.getElementById("miaDash").style.marginLeft= "0px";
    document.getElementById('miaDash').style.width="100%";
    this.side=true;

}
clickNav(){
 if(this.side){
  this.openNav();
 }else {
   this.closeNav();
 }
  
}

  ngOnInit() {
    this.data.getFolder().subscribe((res) => {
      console.log(res);
      this.folder = res['data'];
      console.log(this.folder);
    })
  }

}
