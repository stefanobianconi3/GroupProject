import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../classes/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input('folder') folder;
  @Input('maxFolder') maxFolder;
  @Output('folderSelected') folderSelected = new EventEmitter();
  private path = "";

  constructor() { }

  ngOnInit() {
  }

  searchFolder(arrayFolder, name) {
    console.log(arrayFolder);
    for (let i = 0; i < arrayFolder.length; i++) {
      if (arrayFolder[i]['name'] === name) {
        this.path = this.path + arrayFolder[i]['name'];
        console.log('trovato');
        console.log(arrayFolder[i]['name']);
        console.log("Path: "+this.path);
        this.path="";
        break;
      } else {
        if (arrayFolder[i]['children'] && arrayFolder[i]['children'].length > 0 && !(arrayFolder[i]['type'] == "model")) {
          this.path = this.path + arrayFolder[i]['name'] + "\\"+"\\";
          this.searchFolder(arrayFolder[i]['children'], name);
        }
      }
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
    this.searchFolder(this.maxFolder, cartella.name);
    cartella.selected = !cartella.selected;
    this.folderSelected.emit(cartella);
    event.stopPropagation();
    console.log(cartella);
  }
}
