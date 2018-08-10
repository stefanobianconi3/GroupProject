import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/classes/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input('folder') folder: Array<Object>;
  private selected;

  constructor() { }

  ngOnInit() {
  }

  isDir(folder) {
    console.log(folder['type'])
    if (folder['type'] == "dir") {
      return true
    } else {
      return false
    }
  }

  select(cartella: Folder) {
    cartella.selected = true;
    this.selected = cartella;
  }

}
