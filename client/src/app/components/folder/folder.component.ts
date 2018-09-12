import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../classes/Folder';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})

export class FolderComponent implements OnInit {

  @Input('folder') folder;
  @Output('folderSelected') folderSelected = new EventEmitter();
  private options : ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          this.select(node.data);
        }
      }
    }
  };

  constructor() { 
  }

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
    this.folderSelected.emit(cartella);
  }
}
