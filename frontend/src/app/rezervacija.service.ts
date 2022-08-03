import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  uri = 'http://localhost:4000'
  constructor(private http : HttpClient) { }

  postojiRezervacija(rez){
    const data = {
      rez:rez
    }
    return this.http.post(`${this.uri}/rezervacije/postojiRezervacija`,data);
  }

  ubaciRezervaciju(rez){
    const data = {
      rez:rez
    }
    return this.http.post(`${this.uri}/rezervacije/ubaciRezervaciju`,data);
  }

  dohvatiSveRezervacije(idN) {
    const data={
      idN:idN
    }
    return this.http.post(`${this.uri}/rezervacije/dohvatiSveRezervacije`,data);
  }

}
