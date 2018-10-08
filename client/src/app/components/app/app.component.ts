import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pros-Chain';
  private folderSelect;

  onActivate(elementRef) {
    elementRef.folderSelected.subscribe(f => {
        this.folderSelect = f;
    });
  }

}
