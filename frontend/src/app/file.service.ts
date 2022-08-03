import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  uri = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  upload(formdata){
    return this.http.post(`${this.uri}/file`,formdata);
  }

}
