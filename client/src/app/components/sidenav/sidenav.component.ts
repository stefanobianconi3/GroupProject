import { Component, OnInit } from '@angular/core';
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
  private folder = [];

  constructor(private http: HttpClientModule, private data: DataService) { }

  ngOnInit() {
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

