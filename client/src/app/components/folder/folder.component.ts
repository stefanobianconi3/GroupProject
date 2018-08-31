import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../classes/Folder';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input('folder') folder;
  @Input('maxFolder') maxFolder;
  @Output('folderSelected') folderSelected = new EventEmitter();

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
    this.folderSelected.emit(cartella);
  }
}
