import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-dashbody',
  templateUrl: './dashbody.component.html',
  styleUrls: ['./dashbody.component.scss']
})
export class DashbodyComponent implements OnInit {

  @Input() models;

  constructor() { }

  ngOnInit() {
  }

}
