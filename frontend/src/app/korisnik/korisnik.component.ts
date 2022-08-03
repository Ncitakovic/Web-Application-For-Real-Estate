import { HttpClient } from '@angular/common/http';
import { Nekretnina } from './../models/nekretnina';
import { FileService } from './../file.service';
import { Ponuda } from './../models/ponuda';
import { PonudaService } from './../ponuda.service';
import { Adresa } from './../models/adresa';
import { KorisnikService } from './../korisnik.service';
import { Korisnik } from './../models/korisnik';
import { Component, OnInit } from '@angular/core';
import { NekretninaService } from '../nekretnina.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private nekretninaServis: NekretninaService, private ponudaServis: PonudaService, private fileServis: FileService, private http: HttpClient) { }
  kor: Korisnik;
  ngOnInit(): void {
    this.kor = JSON.parse(localStorage.getItem('ulogovan'));
    this.kor_ime_prethodno = this.kor.kor_ime;
    this.novaNekretnina = new Nekretnina();
    this.novaNekretnina.adresa = new Adresa();
    this.novaNekretnina.galerija = new Array<Object>();
    this.novaNekretnina.odobrena = false;
    this.novaNekretnina.vlasnik = this.kor.id;
    this.nekretninaServis.dohvatiNekretnine(this.kor.id).subscribe((nekretnine: Nekretnina[]) => {
      this.mojeNekretnine = nekretnine;
    })
    this.ponudaServis.dohvatiPonude(this.kor.id).subscribe((ponude: Ponuda[]) => {
      this.ponude = ponude;
    })

    this.nekretninaServis.dohvatiSveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.sveNekretnine = nekretnine;
    })


    //  this.ponudaServis.dohvatiPonudeRez(this.kor.id).subscribe((ponude:Ponuda[])=>{
    //   this.mojeRez = ponude;
    // })

  }

  slika: string;
  profilnaSlikaIzmena;
  onFileSelectedUser(e) {
    if (e.target.files.length > 0) {
      this.profilnaSlikaIzmena = e.target.files[0];
      this.kor.slika = e.target.files[0].name;
    }
  }

  kor_ime_prethodno: string;

  grad: string;
  cenaOd: number;
  cenaDo: number;

  message: string;
  porukaUpdateKorisnik: string;

  promeniPodatke() {
    this.korisnikServis.promeniPodatke(this.kor, this.kor_ime_prethodno).subscribe((res) => {
      if (res['message'] == 'user changed') {
        this.kor_ime_prethodno = this.kor.kor_ime;
        this.porukaUpdateKorisnik = 'izmenjeni podaci korisnika'
      } else {
        this.porukaUpdateKorisnik = 'neuspesna izmena podataka korisnika'
      }

    })

    if (this.profilnaSlikaIzmena != null) {
      this.kor.slika = this.profilnaSlikaIzmena.name;
      localStorage.setItem('ulogovan', JSON.stringify(this.kor));

      const formdata = new FormData();
      formdata.append('file', this.profilnaSlikaIzmena);

      this.http.post('http://localhost:4000/file', formdata).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }

  }
  update: boolean = false;
  updateData() {
    this.update = !this.update;
  }

  porukaPretraga: string;

  nekretninePretraga: Nekretnina[];
  randomSlike: number[] = [];
  randomSlikeGen: Object[] = [];

  pretrazi() {
    if (this.grad == null && this.cenaOd == null && this.cenaDo == null) {
      this.porukaPretraga = 'morate uneti barem jedan parametar';
      return;
    }
    if (this.grad == null) this.grad = '';
    if (this.cenaOd == null) this.cenaOd = 0;
    if (this.cenaDo == null) this.cenaDo = Number.MAX_SAFE_INTEGER;

    // if(this.cenaOd==null) this.cenaOd=parseInt("");
    // if(this.cenaDo==null) this.cenaDo=parseInt("");


    this.nekretninaServis.pretrazi(this.grad, this.cenaOd, this.cenaDo).subscribe((nekretnine: Nekretnina[]) => {
      this.nekretninePretraga = nekretnine;

      for (let i = 0; i < this.nekretninePretraga.length; i++) {
        this.randomSlike[this.nekretninePretraga[i].id - 1] = Math.floor(Math.random() * (this.nekretninePretraga[i].galerija.length + 1 - 1));
      }
      for (let i = 0; i < this.nekretninePretraga.length; i++) {
        let index = this.nekretninePretraga[i].id - 1;
        this.randomSlikeGen[index] = this.nekretninePretraga[i].galerija[this.randomSlike[index]];
      }
    })

  }

  //DODAVANJE NEKRETNINE
  //  -galerija
  multipleImages = [];
  onFileSelected(e) {
    if (e.target.files.length > 0) {
      this.multipleImages = e.target.files;
    }
    for (let index = 0; index < e.target.files.length; index++) {
      let obj = {
        slika: e.target.files[index].name
      }
      this.novaNekretnina.galerija.push(obj);
    }
  }



  onFileSelectedProperty(e) {

    if (e.target.files.length > 0) {
      this.multipleImages = e.target.files;
    }
    this.nekretninaZaIzmeniti.galerija = [];

    for (let index = 0; index < e.target.files.length; index++) {
      let obj = {
        slika: e.target.files[index].name
      }
      this.nekretninaZaIzmeniti.galerija.push(obj);
    }
  }
  uploadMultiple(event: any) {
    const files: FileList = event.target.files;

    const formdata = new FormData();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formdata.append("files", element);

    }


    this.http.post('http://localhost:4000/multifiles', formdata).subscribe(
      (d) => {
        console.log(d);
      }, (error) => {
        console.error(error)
      }
    );
  }

  upload(event: any) {
    const file = event.target.files[0];

    const formdata = new FormData();
    formdata.append("file", file);

    this.fileServis.upload(formdata).subscribe(
      (d) => {
        console.log(d);
      }, (error) => {
        console.error(error)
      }
    );
    let obj = {
      slika: event.target.files[0].name
    }
    this.novaNekretnina.galerija.push(obj);
  }

  // upload end

  novaNekretnina: Nekretnina;
  dodajNekretninu() {
    this.nekretninaServis.dodajNekretninu(this.novaNekretnina).subscribe((res) => {
      // if(res['message']='OK') alert('DODATA NEKRETNINA');
      // else alert('NIJE DODATA NEKRETNINA');
    })

    const formdata = new FormData();
    for (let img of this.multipleImages) {
      formdata.append('files', img);
    }
    this.http.post('http://localhost:4000/multifiles', formdata).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );



  }


  //LISTA KORISNIKOVIH NEKRETNINA
  mojeNekretnine: Nekretnina[];
  izmeniNekretninu: boolean = false;
  nekretninaZaIzmeniti: Nekretnina;
  izmeniPodatkeNekretnine(n) {
    this.izmeniNekretninu = true;
    this.nekretninaZaIzmeniti = n;
  }


  fIzmeniNekretninu() {
    this.nekretninaServis.izmeniNekretninu(this.nekretninaZaIzmeniti).subscribe((res) => {
      // if(res['message']=='OK') alert('OK IZMENJENO')
      // else alert('NOT OK IZMENJENO')
    })

    const formdata = new FormData();
    for (let img of this.multipleImages) {
      formdata.append('files', img);
    }
    this.http.post('http://localhost:4000/multifiles', formdata).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }


  //ODOBRAVANJE NOVIH NEKRETNINA ZA PRODAJU

  ponude: Ponuda[] = []

  odobri(pp) {

    let p: Ponuda = pp;
    if (this.seProdaje(p.idN)) {
      for (let i = 0; i < this.ponude.length; i++) {
        if (this.ponude[i].idN == p.idN) {
          this.ponudaServis.ukloniPonuduZaNekretninu(this.ponude[i].id).subscribe((res) => {
            //  alert('uklonjena'+i)
          });
        }
      }
    } else {
      this.ponudaServis.ukloniPonuduZaNekretninu(p.id).subscribe((response) => {
        // alert('prihvacena rez');
        this.ngOnInit();
      });
    }

    // for(let i=0;i<this.ponude.length;i++){
    //   if(this.ponude[i].idN==p.idN && this.seProdaje(p.idN)){

    //     this.ponudaServis.ukloniPonuduZaNekretninu(this.ponude[i].id).subscribe((res)=>{
    //     })
    //   }
    // }

    let idN = p.idN;
    let idK = p.idK;
    if (this.seProdaje(p.idN)) {
      this.nekretninaServis.dodeliVlasnika(idN, idK).subscribe((res) => {
        // alert('kupio')
        this.ngOnInit();
      })
    }
  }

  seProdaje(idN) {
    for (let j = 0; j < this.sveNekretnine.length; j++) {
      if (this.sveNekretnine[j].id == idN) {
        if (this.sveNekretnine[j].izdajeIliProdaje == 'prodaje') return true;
      }
    }
    return false;
  }

  sveNekretnine: Nekretnina[];
  //REZERVACIJE
  mojeRez: Ponuda[];
  mR: Ponuda[];
  showRez: boolean;
  mojeRezervacije() {
    for (let i = 0; i < this.mojeRez.length; i++) {
      this.nekretninaServis.seIzdaje(this.mojeRez[i].idN).subscribe((res) => {
        if (res['message'] == 'izdaje') this.mR.push(this.mojeRez[i]);
      })

    }
    this.showRez = true;
  }

}
