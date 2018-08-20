import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../classes/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input('folder') folder;
  @Output('folderSelected') folderSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  createFolders(folders) {
    for (let i = 0; i < folders.length; i++) {
      folders[i]
    }
  }

  isDir(folder) {
    if (folder['type'] === "dir") {
      return true
    } else {
      return false
    }
  }

  select(event, cartella: Folder) {
    cartella.selected = !cartella.selected;
    this.folderSelected.emit(cartella);
    event.stopPropagation();
    console.log(cartella);
  }
}
