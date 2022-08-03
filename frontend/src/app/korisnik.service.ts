import { Korisnik } from './models/korisnik';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  prijava(kor_ime,lozinka){
    const data = {
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/prijava`,data);
  }
  register(korisnik){
    const data={
      korisnik:korisnik
    }
    return this.http.post(`${this.uri}/korisnici/registracija`,data);
  }
  promeniLozinku(kor_ime,stara_lozinka,nova_lozinka){
    const data = {
      kor_ime:kor_ime,
      stara_lozinka:stara_lozinka,
      nova_lozinka:nova_lozinka,
    }
    return this.http.post(`${this.uri}/korisnici/promeniLozinku`,data);
  }

  promeniPodatke(korisnik,kor_ime_ulogovan){
    const data  = {
      korisnik : korisnik,
      kor_ime_ulogovan : kor_ime_ulogovan
    }
    return this.http.post(`${this.uri}/korisnici/promeniPodatke`,data);
  }
  dohvatiKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiKorisnike`);
  }
  odobriKorisnika(kor_ime){
    const data = {
      kor_ime:kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/odobriKorisnika`,data);
  }
  odbijKorisnika(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/korisnici/odbijKorisnika`,data)
  }

  obrisiKorisnika(id){
    const data = {
      id:id
    }
    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`,data)
  }



  isLoggedIn(){
     let korisnik:Korisnik = JSON.parse(localStorage.getItem('ulogovan'));
      if(korisnik){
        if(korisnik.tip=='admin') return true;
        else return false;
      }else
        return false;
  }

}
