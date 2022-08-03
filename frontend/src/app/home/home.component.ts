import { NekretninaService } from './../nekretnina.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private nekretninaServis : NekretninaService,private ruter:Router) { }

  ngOnInit(): void {

    this.nekretninaServis.dohvatiSvePromovisaneNekretnine().subscribe((n:Nekretnina[])=>{


      for (let i = 0; i < n.length; i++) {
        this.promovisaneNekretnine[i]=new Nekretnina();
        this.promovisaneNekretnine[i].galerija = new Array<Object>();
      }
      this.promovisaneNekretnine=n;

      for (let i = 0; i < this.promovisaneNekretnine.length; i++) {
        let num = this.promovisaneNekretnine[i].id-1;
        this.randomSlike[num] = Math.floor(Math.random()*(this.promovisaneNekretnine[i].galerija.length+1-1));
      }
      for (let i = 0; i < this.promovisaneNekretnine.length; i++) {
        let index = this.promovisaneNekretnine[i].id-1;
        this.randomSlikePromotedGen[index] = this.promovisaneNekretnine[i].galerija[this.randomSlike[index]];
      }
    })

  }
  randomSlikePromotedGen: Object[]=[];



  kor_ime:string;
  lozinka:string;
  poruka:string;
  prijava(){
    this.korisnikServis.prijava(this.kor_ime,this.lozinka).subscribe((kor: Korisnik)=>{
      if(kor){
        localStorage.setItem('ulogovan', JSON.stringify(kor));
        if(kor.tip=='korisnik'){
          this.ruter.navigate(['korisnik']);
        }else if(kor.tip=='agent'){
          this.ruter.navigate(['agent']);
        }else{
          this.ruter.navigate(['admin'])
        }
      }else{
        this.poruka = 'greska';
      }
    })
  }

  grad:string;
  cenaOd:number;
  cenaDo:number;

  porukaPretraga:string;

  promovisaneNekretnine:Nekretnina[] = [];
  nekretninePretraga : Nekretnina[] = [];
  randomSlike : number[] = [];
  randomSlikeGen: Object[]=[];
  pretrazi(){
    if(this.grad== null && this.cenaOd==null && this.cenaDo==null ){
      this.porukaPretraga='morate uneti barem jedan parametar';
      return;
    }
    if(this.grad==null) this.grad = "";

    if(this.cenaOd==null) this.cenaOd=0;
    if(this.cenaDo==null) this.cenaDo=Number.MAX_SAFE_INTEGER;

    // if(this.cenaOd==null) this.cenaOd=parseInt("");
    // if(this.cenaDo==null) this.cenaDo=parseInt("");

    this.nekretninaServis.pretrazi(this.grad,this.cenaOd,this.cenaDo).subscribe((nekretnine:Nekretnina[])=>{
      this.nekretninePretraga = nekretnine;


      for (let i = 0; i < this.nekretninePretraga.length; i++) {
        this.randomSlike[this.nekretninePretraga[i].id-1] = Math.floor(Math.random()*(this.nekretninePretraga[i].galerija.length+1-1));
      }
      for (let i = 0; i < this.nekretninePretraga.length; i++) {
        let index = this.nekretninePretraga[i].id-1;
        this.randomSlikeGen[index] = this.nekretninePretraga[i].galerija[this.randomSlike[index]];
      }

    })

  }


}
