import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { Folder } from '../../classes/Folder';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('mylabel') mylabel: ElementRef
  private folder = [];
  private side: boolean = true;
  @Input() folderName;
  @Output() selezionata2 = new EventEmitter();
  constructor(private http: HttpClientModule, private data: DataService) { }
  private selected;
  private selectedPath;
  private selctedbool=false;
  private msgerror=false;
  private modifica=false;

  ngOnInit() {
    let el: HTMLElement = this.mylabel.nativeElement as HTMLElement;
    el.click();
    this.data.getFolder().subscribe(
      (payload) => {
        if (payload['success']) {
          this.folder = payload['data'];
        } else {
          console.log(payload['error'])
        }
      }
    )
  }

  openNav() {
    document.getElementById('miaDash').style.marginLeft = "320px";
    document.getElementById('miaDash').style.width = "76.55%";
    this.side = false;
  }

  closeNav() {
    document.getElementById("miaDash").style.marginLeft = "0px";
    document.getElementById('miaDash').style.width = "100%";
    this.side = true;

  }
  clickNav() {
    if (this.side) {
      this.openNav();
    } else {
      this.closeNav();
    }
  }

  selezionata(f){
    this.selezionata2.emit(f);
    this.selected=f.cartella;
    this.selectedPath=f.path;
    this.selctedbool=true;
    this.msgerror=false;
    
  }

  modifyFolder(){
    if(this.selctedbool){
      this.modifica=true;
  }
    else {
      this.msgerror=true;

    }
  }

  modifyFolderReq(newFolderName){
    this.data.modifyFolder(this.selected.name, newFolderName).subscribe(
      (payload) => {
        if (payload['success']) {
          alert('modificata correttamente')
        } else {
          console.log(payload['error'])
        }
      }
    )

  }



  newFolderReq(foldername) {
    this.data.newFolder(foldername).subscribe(
      (payload) => {
        if (payload['success']) {
          this.folder = payload['data'];
        } else {
          console.log(payload['error'])
        }
      }
    );
  }

}

