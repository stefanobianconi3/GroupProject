import { Injectable } from '@angular/core';
import { ServerLocation } from '../classes/ServerLocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
private folder = [];
private APIURL= ServerLocation.URL+'api/data';
private headers;
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders()
    .set("token", localStorage.getItem('token'))
    .set("id", localStorage.getItem('id'));
  }

  getFolder(){
  return this.http.get(this.APIURL+"/", {headers: this.headers})
 }
 
}
