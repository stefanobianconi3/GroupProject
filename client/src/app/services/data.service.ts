import { Injectable } from '@angular/core';
import { ServerLocation } from '../classes/ServerLocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
private folder = [];
private APIURL= ServerLocation.URL+'api/data';
private header = {
  token: localStorage.getItem('token'),
  id: localStorage.getItem('id')
}
  constructor(private http:HttpClient) { }

  getFolder(){
  return this.http.get(this.APIURL, {headers: this.header})
 }
 
}
