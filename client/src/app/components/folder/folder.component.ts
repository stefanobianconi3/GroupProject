import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Folder } from '../../classes/Folder';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})

export class FolderComponent implements OnInit {
  @Input('folder') folder;
  @Output('folderSelected') folderSelected = new EventEmitter();
  private nodeSelected;
  

  private options : ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          this.select(node.data);
          node.expand();
          if(this.nodeSelected){
            try{
              document.getElementById(this.nodeSelected.data.name).style.backgroundColor="#008080";
            } catch (err) {
            }
          }
          this.nodeSelected = node;
          document.getElementById(node.data.name).style.backgroundColor="#f57c00";
        }
      }
    }
  };

  constructor() { 
  }

  ngOnInit() {


  }

  isDir(folder) {
    if (folder['type'] == "dir") {
      return true
    } else {
      return false
    }
  }

  select(cartella: Folder) {
    this.folderSelected.emit(cartella);
  }

  hideNode(node){
    if(node.data.type != 'dir'){
      node.hide();
    }
  }
}
