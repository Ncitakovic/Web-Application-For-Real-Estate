import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  ime:string;
  prezime:string;
  kor_ime:string;
  lozinka:string;
  potvrda_lozinke:string;
  grad:string;
  drzava:string;
  slika:string;
  mail:string;

  message:string;
  register(){
    if(this.lozinka!=this.potvrda_lozinke) {
      this.message='lozinke se razlikuju!';
      return;
    }
    // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    let regex = /^(?=.{8,24}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@*?!:;])(?:([\w\d@*?!:;])\1?\1?(?!\1))+$/;

    if(!regex.test(this.lozinka)){
      this.message = 'lozinka nije u dobrom formatu';
      return;
    }

    let korisnik = new Korisnik();
    korisnik.ime = this.ime;
    korisnik.prezime=this.prezime;
    korisnik.kor_ime=this.kor_ime;
    korisnik.lozinka=this.lozinka;
    korisnik.grad = this.grad;
    korisnik.drzava = this.drzava;
    korisnik.slika=this.slika;
    korisnik.mail=this.mail;
    korisnik.odobren=false;
    korisnik.odbijen=false;

    if(this.tip=='agent') korisnik.tip='agent';
    else korisnik.tip='korisnik'

    if(korisnik.slika == null){
      korisnik.slika = 'generic';
    }

    this.korisnikServis.register(korisnik).subscribe((msg)=>{

      if(msg['message']=='postoji'){ this.message='postoji vec kor!'; return;}
      else{
        this.message='korisnik uspesno dodat';

        //SALJEMO ZAHTEV
        // let zahtevi: Korisnik[] = [];
        // if(localStorage.getItem('zahtevi')!=null){
        //   zahtevi = JSON.parse(localStorage.getItem('zahtevi'));
        // }
        // zahtevi.push(korisnik);
        // localStorage.setItem('zahtevi', JSON.stringify(zahtevi));

      }
    })


    if(this.image!=null){
      const formdata = new FormData();
      formdata.append('file',this.image)

      this.http.post('http://localhost:4000/file',formdata).subscribe((res)=>console.log(res),(err)=>console.log(err));
    }


  }

  //DODAVANJE SLIKE KORISNIKA
  onFileSelected(e){
    this.slika = e.target.files[0].name;
  }
  image;
  selectImage(event){
    if(event.target.files.length>0){
      this.image = event.target.files[0];
      this.slika = event.target.files[0].name;
    }
  }



  //ADMIN
  @Input() tip: String

}
