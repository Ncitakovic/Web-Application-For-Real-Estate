import { CookieService } from 'ngx-cookie-service';
import { PonudaService } from './../ponuda.service';
import { Korisnik } from './../models/korisnik';
import { RezervacijaService } from './../rezervacija.service';
import { NekretninaService } from './../nekretnina.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Rezervacija } from '../models/rezervacija';
import { Ponuda } from '../models/ponuda';

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css']
})
export class NekretninaComponent implements OnInit {

  constructor(private ruta:ActivatedRoute,private nekretninaServis:NekretninaService, private rezervacijaServis:RezervacijaService,private ponudaServis:PonudaService,private cookie: CookieService) { }
  rezervacije:Rezervacija[] = [];
  ngOnInit(): void {
    let id = this.ruta.snapshot.paramMap.get('id');

    this.nekretninaServis.dohvatiNekretninuPoId(parseInt(id)).subscribe((nekretnina:Nekretnina)=>{
      this.nekretnina = nekretnina;
      this.izdajeProdaje=nekretnina.izdajeIliProdaje;

      this.rezervacijaServis.dohvatiSveRezervacije(id).subscribe((rezervacije:Rezervacija[])=>{
        this.rezervacije=rezervacije;
      })

    })

    //COOKIES
    let user : Korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    let idUser = user.id;

    if(this.cookie.check(""+id+"+"+idUser)){
      this.viewCount = parseInt(this.cookie.get(""+id));
      return;
    }
    if(this.cookie.check(""+id)){
        this.cookie.set(""+id+"+"+idUser,"1",3);
        let numStr = this.cookie.get(""+id);
        let num = parseInt(numStr)+1;
        this.cookie.set(""+id,""+num,3);
    }else{
        this.cookie.set(""+id+"+"+idUser,"1",3);
        this.cookie.set(""+id,""+1,3);
    }
    this.viewCount = parseInt(this.cookie.get(""+id));

  }
  viewCount:number = 0;

  nekretnina : Nekretnina;
  izdajeProdaje :string;
  datumOd: Date;
  datumDo: Date;

  poruka:string;

  kredit:boolean;
  gotovina:boolean;
  sadrzajPoruke:string;


  iznajmi(){


    let r = new Rezervacija();
    r.idN = this.nekretnina.id;
    r.datumOd = this.datumOd;
    r.datumDo = this.datumDo;

    // this.rezervacijaServis.postojiRezervacija(r).subscribe((res)=>{
    //   if(res['message']=='YES'){
    //     this.poruka = 'postoji vec rezervisano'
    //     return;
    //   }else{
    //     this.poruka='nije bilo rez'
    //   }
    // })


    if(!this.postojiVecRezervacija(new Date(r.datumOd),new Date(r.datumDo))){

      this.rezervacijaServis.ubaciRezervaciju(r).subscribe((res)=>{
        if(res['message']=='YES'){
          this.poruka = 'uspesno ste rezervisali'
        }else{
          this.poruka = 'greska kod rezervacije'
        }
      })

    }else{
      this.poruka='nazalost ali postoji vec rezervisano'
    }


  }

  postojiVecRezervacija(datumOd,datumDo):boolean{
    for(let r of this.rezervacije){
      if((new Date(r.datumOd).getTime()>datumOd.getTime() && new Date(r.datumOd).getTime()<datumDo.getTime())
             ||   (new Date(r.datumDo).getTime()>datumOd.getTime() && new Date(r.datumDo).getTime()<datumDo.getTime()))
        return true;
    }
    return false;
  }

  prikazi:boolean = false;
  kontaktirajVlasnika(){
    this.prikazi = true;
  }





  //SLANJE ZAHTEVA ZA PONUDU

  dajPonudu(){

    let kor : Korisnik = JSON.parse(localStorage.getItem('ulogovan'));

    let idN = this.nekretnina.id;
    let nazivNekretnine = this.nekretnina.naziv;
    let idK = kor.id;
    let tekst = this.sadrzajPoruke;
    if(this.izdajeProdaje=='izdaje'){
      tekst+=' datumi '+this.datumOd.toString()+'-'+this.datumDo.toString();
    }
    // else{
    //   tekst+= this.gotovina? 'gotovina':'kredit';
    // }

    let idV = this.nekretnina.vlasnik;

    let ponuda = new Ponuda();//= new Ponuda(idK,idV,idN,nazivNekretnine,tekst,false);
    ponuda.idK=idK
    ponuda.idV=idV
    ponuda.idN=idN
    ponuda.nazivNekretnine=nazivNekretnine;
    ponuda.ponuda =tekst;
    ponuda.odobrena=false;

    this.ponudaServis.dohvatiId().subscribe((pon:Ponuda)=>{
      let idp;
      if(pon==null) idp=1;
      else idp = pon.id+1;
      ponuda.id=idp;
      this.ponudaServis.kreirajPonudu(ponuda).subscribe((res)=>{
        if(res){
          // alert('ok')
        }else{
          // alert('not ok')
        }
      })
    })






  }



}
