import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../classes/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input('folder') folder: Array<Object>;
  @Output('folderSelected') folderSelected = new EventEmitter();
  private selected;

  constructor() { }

  ngOnInit() {
  }

  isDir(folder) {
    if (folder['type'] === "dir") {
      return true
    } else {
      return false
    }
  }

  select(cartella: Folder) {
    cartella.selected = !cartella.selected;
    this.selected = cartella;
    this.folderSelected.emit(this.selected);
  }
}
