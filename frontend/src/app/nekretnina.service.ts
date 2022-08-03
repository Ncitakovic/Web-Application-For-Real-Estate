import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretninaService {
  uri = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  pretrazi(grad,cenaOd,cenaDo){
    const data = {
      grad:grad,
      cenaOd:cenaOd,
      cenaDo:cenaDo
    }
    return this.http.post(`${this.uri}/nekretnine/pretraga`,data);
  }
  dohvatiNekretninuPoId(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretninuPoId`,data);

  }

  dodajNekretninu(nekretnina){
    const data = {
      nekretnina:nekretnina
    }
    return this.http.post(`${this.uri}/nekretnine/dodajNekretninu`,data);
  }
  dohvatiNekretnine(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretnine`,data);
  }
  dohvatiSveNekretnine(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiSveNekretnine`);
  }
  dohvatiSvePromovisaneNekretnine(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiSvePromovisaneNekretnine`);
  }

  izmeniNekretninu(nekretnina){
    const data = {
      nekretnina : nekretnina
    }
    return this.http.post(`${this.uri}/nekretnine/izmeniNekretninu`,data);
  }

  promovisiNekretninu(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/promovisiNekretninu`,data);
  }
  otpromovisiNekretninu(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/otpromovisiNekretninu`,data);
  }

  dodeliVlasnika(idN,idK){
    const data = {
      idN:idN,
      idK:idK
    }
    return this.http.post(`${this.uri}/nekretnine/dodeliVlasnika`,data)
  }


  odobriNekretninu(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/odobriNekretninu`,data)

  }

  seIzdaje(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/nekretnine/seIzdaje`,data)

  }



  obrisiGaleriju(n){
    const data = {
      n:n
    }
    return this.http.post(`${this.uri}/nekretnine/obrisiGaleriju`,data)
  }

}
