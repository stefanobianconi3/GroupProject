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

  select(cartella: Folder) {
    cartella.selected = true;
    this.selected = cartella;
  }

}
