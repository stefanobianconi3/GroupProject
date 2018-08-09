import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { Folder } from '../../classes/Folder'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('mylabel') mylabel: ElementRef
  private folder = [];
  private side: boolean = true;

  constructor(private http: HttpClientModule, private data: DataService) { }

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

  newFolderReq(form: NgForm) {
    this.data.newFolder(form.value.foldername).subscribe(
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

