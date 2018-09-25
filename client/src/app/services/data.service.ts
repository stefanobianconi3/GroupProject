import { Injectable, Output, EventEmitter } from '@angular/core';
import { ServerLocation } from '../classes/ServerLocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private folder = [];
  private APIURL = ServerLocation.URL + 'api/data';
  @Output() outLogout = new EventEmitter()
  private headers;

  constructor(private router: Router, private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("token", localStorage.getItem('token'))
      .set("id", localStorage.getItem('id'));
  }

  getFolder() {
    return this.http.get(this.APIURL, { headers: this.headers })
  }

  newFolder(folderName) {
    return this.http.post(this.APIURL + '/folder', { folderName: folderName }, { headers: this.headers })
  }

  modifyFolder(folderName, folderNewName) {
    return this.http.put(this.APIURL + '/folder', { folderName: folderName, folderNewName:folderNewName }, { headers: this.headers })
  }

  deleteFolder(folderName) {
    return this.http.post(this.APIURL + '/folder/delete', { folderName: folderName }, { headers: this.headers })
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      this.http.get(ServerLocation.URL + 'api/auth/checkToken', { headers: this.headers }).subscribe(
        (payload) => {
          if (!payload['success']) {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('nome');
            this.outLogout.emit();
            window.location.reload(true);
          }
        }
      );
    }
  }

  getModel(path, version) {
    return this.http.post(this.APIURL+"/model/open", {modelName: path, version: version}, { headers: this.headers });
  }

  saveModel(path, version, content){
    return this.http.post(this.APIURL+"/model/save", {modelName: path, version: version, content: content}, { headers: this.headers });
  }

  createModel(path){
    return this.http.post(this.APIURL+"/model", {modelName: path}, { headers: this.headers } );
  }

  deleteModel(path){
    return this.http.post(this.APIURL+"/model/delete", {modelName: path}, { headers: this.headers });
  }

}
