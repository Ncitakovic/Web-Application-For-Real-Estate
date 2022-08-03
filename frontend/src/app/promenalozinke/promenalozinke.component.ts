import { Korisnik } from './../models/korisnik';
import { KorisnikService } from './../korisnik.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promenalozinke',
  templateUrl: './promenalozinke.component.html',
  styleUrls: ['./promenalozinke.component.css']
})
export class PromenalozinkeComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private ruter:Router) { }

  ngOnInit(): void {
  }
  stara_lozinka:string;
  nova_lozinka:string;
  potvrda_nove:string;

  poruka:string;

  promeni(){
    if(this.nova_lozinka!=this.potvrda_nove) {
      this.poruka='nisu iste nove lozinke!';
      return;
    }

    let regex = /^(?=.{8,24}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@*?!:;])(?:([\w\d@*?!:;])\1?\1?(?!\1))+$/;
    if(!regex.test(this.nova_lozinka)){
      this.poruka='lozinka nije u dobrom formatu'; return;
    }

    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    let kor_ime = korisnik.kor_ime;
    this.korisnikServis.promeniLozinku(kor_ime,this.stara_lozinka,this.nova_lozinka).subscribe((kor:Korisnik)=>{
      if(kor) {
        this.poruka='postoji korisnik,updateovana lozinka';
        localStorage.clear();
        this.ruter.navigate(['']);
      }else
        this.poruka='neuspesan update';
    })

  }
}
