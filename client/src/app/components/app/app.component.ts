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
    try{
      elementRef.folderSelected.subscribe(f => {
        this.folderSelect = f;
    });
    } catch (e) {

    }
  }

}
