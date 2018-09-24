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
  private selected:Folder;
  private nameSelected;
  private selctedbool = false;
  private msgerror = false;
  private modifica = false;

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

  selezionata(f: Folder) {
    this.selezionata2.emit(f);
    this.selected = f;
    this.nameSelected=f.name
    this.selctedbool = true;
    this.msgerror = false;
  }

  private generateNewPath(oldPath: String, newName) {
    let array = oldPath.split("\\");
    array[array.length - 1] = newName;
    return array.join("\\");
  }

  modifyFolder(newFolderName) {
    if (this.selected) {
      this.msgerror = false;
      this.data.modifyFolder(this.selected.path, this.generateNewPath(this.selected.path, newFolderName)).subscribe(
        (payload) => {
          if (payload['success']) {
            this.folder = payload['data'];
          } else {
            console.log(payload['error'])
          }
        }
      )
    } else {
      this.msgerror = true;
    }
  }

  deleteFolder() {
    if (this.selected) {
      this.msgerror = false;
      this.data.deleteFolder(this.selected.path).subscribe(
        (payload) => {
          if (payload['success']) {
            this.folder = payload['data'];
            this.nameSelected= "";
          } else {
            console.log(payload['error'])
          }
        }
      )
    } else {
      this.msgerror = true;
    }
  }

  newFolderReq(foldername) {
    if (this.selected) {
      this.data.newFolder(this.selected.path + "\\" + "\\" + foldername).subscribe(
        (payload) => {
          if (payload['success']) {
            this.folder = payload['data'];
          } else {
            console.log(payload['error'])
          }
        });
    } else {
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

}

