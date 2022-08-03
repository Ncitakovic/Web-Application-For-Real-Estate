import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PonudaService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000'
  kreirajPonudu(ponuda){
    const data = {
      ponuda:ponuda
    }
    return this.http.post(`${this.uri}/ponude/kreirajPonudu`,data)

  }
  dohvatiPonude(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/ponude/dohvatiPonude`,data);
  }

  odobriPonudu(ponuda){
    const data= {
      ponuda:ponuda
    }
    return this.http.post(`${this.uri}/ponude/odobriPonudu`,data)
  }

  ukloniPonuduZaNekretninu(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/ponude/ukloniPonuduZaNekretninu`,data)
  }

  dohvatiPonudeRez(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/ponude/dohvatiPonudeRez`,data)
  }

  dohvatiId(){
    return this.http.get(`${this.uri}/ponude/dohvatiId`)
  }


}
