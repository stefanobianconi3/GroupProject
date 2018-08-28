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
  private stop = false;

  constructor() { }

  ngOnInit() {
  }

  searchFolder(arrayFolder, name, pointer=0) {
    while(this.stop === false){
      if (arrayFolder[pointer]['name'] == name){
        console.log("Sono dentro al controllo e l'ho superato");
        this.path = this.path + arrayFolder[pointer]['name'];
        console.log(this.path);
        this.stop = true;
        return true;
      } else {
        if (arrayFolder[pointer]['children'] && arrayFolder[pointer]['children'].length > 0 && !(arrayFolder[pointer]['type'] == "model")) {
          console.log("Vado dentro al figlio di "+arrayFolder[pointer]['name']);
          this.path = this.path + arrayFolder[pointer]['name'] + "\\"+"\\";
          console.log(this.path);
          this.searchFolder(arrayFolder[pointer]['children'], name);
          if(this.stop === false){
            this.path="";
            pointer++;
          }
        } else {
          break;
        }
      }
    }
    return false;
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
    console.log("Path: "+this.path);
    cartella.selected = !cartella.selected;
    this.folderSelected.emit(cartella);
    event.stopPropagation();
  }
}
