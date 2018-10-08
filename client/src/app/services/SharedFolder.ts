import { Injectable } from '@angular/core';
import { of, Observable, ReplaySubject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class SharedFolder {

  private _sharedFolder = new ReplaySubject();

  public setData(data) {
    this._sharedFolder.next(data);
  }

  public getData() {
    return this._sharedFolder;
  }

}