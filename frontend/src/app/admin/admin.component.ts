import { HttpClient } from '@angular/common/http';
import { Adresa } from './../models/adresa';
import { Nekretnina } from './../models/nekretnina';
import { NekretninaService } from './../nekretnina.service';
import { KorisnikService } from './../korisnik.service';
import { Korisnik } from './../models/korisnik';
import { Component, OnInit } from '@angular/core';
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private nekretninaServis: NekretninaService, private http: HttpClient) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }

  ngOnInit(): void {

    this.korisnikServis.dohvatiKorisnike().subscribe((korisnici: Korisnik[]) => {
      this.korisnici = korisnici;
    })
    this.nekretninaServis.dohvatiSveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine = nekretnine;
    })
    this.novaNekretnina = new Nekretnina();
    this.novaNekretnina.adresa = new Adresa();
    this.novaNekretnina.galerija = new Array<Object>();
    this.novaNekretnina.odobrena = false;

  }
  //update user
  slika: string;
  profilnaSlikaIzmena;
  onFileSelectedUserAdmin(e) {
    if (e.target.files.length > 0) {
      this.profilnaSlikaIzmena = e.target.files[0];
      this.korisnikZaIzmenu.slika = e.target.files[0].name;
    }
  }


  tip: String;
  korisnici: Korisnik[] = [];
  nekretnine: Nekretnina[];

  odobri(kor_ime) {
    this.korisnikServis.odobriKorisnika(kor_ime).subscribe((res) => {

    })
  }
  odbij(id) {
    this.korisnikServis.odbijKorisnika(id).subscribe((res) => { })
  }
  obrisi(k) {
    this.korisnikServis.obrisiKorisnika(k.id).subscribe((res) => {

    })
  }
  update: boolean = false;
  stariKorisnik: Korisnik;
  korisnikZaIzmenu: Korisnik;
  izmeni(k) {
    this.update = true;
    this.stariKorisnik = k;
    this.korisnikZaIzmenu = k;

  }
  promeniPodatke() {
    let kor_ime_ulogovan = this.stariKorisnik.kor_ime;

    this.korisnikServis.promeniPodatke(this.korisnikZaIzmenu, kor_ime_ulogovan).subscribe((res) => {
      // if(res['message'] == 'user added')
      //  alert('sve OK');
      // else alert('nije ok!');
    })

    if (this.profilnaSlikaIzmena != null) {
      const formdata = new FormData();
      formdata.append('file', this.profilnaSlikaIzmena);

      this.http.post('http://localhost:4000/file', formdata).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
  }




  //CHARTS---------------------------------------------------------------------------
  //DATA 1
  xlabels1 = [];
  ylabels1: number[] = [];

  getData1(): any {
    for (let i = 0; i < 6; i++) this.ylabels1[i] = 0;
    this.nekretnine.forEach(n => {
      if (n.cena < 50000) this.ylabels1[0]++;
      else if (n.cena >= 50000 && n.cena < 60000) this.ylabels1[1]++;
      else if (n.cena >= 60000 && n.cena < 70000) this.ylabels1[2]++;
      else if (n.cena >= 70000 && n.cena < 80000) this.ylabels1[3]++;
      else if (n.cena >= 80000 && n.cena < 90000) this.ylabels1[4]++;
      else this.ylabels1[5]++;

    });
    return this.ylabels1;
  }


  prikaz() {
    //DATA FOR CHART 1 (CENOVNI RANG NEKRETNINA)
    this.ylabels1 = this.getData1();

    //CHART
    // var ctx = document.getElementById('myChart');

    var myChart_ = new Chart("myChart_", {
      type: 'doughnut',
      data: {
        labels: ['0-50.000', '50.000-60.000', '60.000-70.000', '70.000-80.000', '80.000-90.000', '90.000-100.000'],
        datasets: [{
          label: 'cena nekretnine',
          data: this.ylabels1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.getData2();
    var myChart2_ = new Chart("myChart2_", {
      type: 'bar',
      data: {
        labels: this.xlabels2,
        datasets: [{
          label: 'broj nekretnina u odredjenom gradu',
          data: this.yLabels2,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.getData34();
    var myChart34_ = new Chart("myChart34_", {
      type: 'bar',
      data: {
        labels: ['stan_izdaje', 'stan_prodaje', 'kuca_izdaje', 'kuca_prodaje'],
        datasets: [{
          label: 'broj stanova/kuca koje se izdaju/prodaju',
          data: this.yLabels34,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
  //DATA FOR CHART 2 (BROJ NEKRETNINA PO GRADOVIMA)
  xlabels2: string[] = []
  yLabels2: number[] = []
  getData2() {

    this.nekretnine.forEach(n => {
      if (!this.xlabels2.includes(n.adresa.grad))
        this.xlabels2.push(n.adresa.grad);
    });

    for (let i = 0; i < this.xlabels2.length; i++) this.yLabels2[i] = 0;
    this.nekretnine.forEach(n => {
      let i = this.xlabels2.indexOf(n.adresa.grad);
      this.yLabels2[i]++;
    });

  }

  //DATA FOR CHART 3/4 (BROJ STANOVA/KUCA KOJI SE IZDAJU / PRODAJU)
  yLabels34: number[] = []

  getData34() {
    for (let i = 0; i < 4; i++)this.yLabels34[i] = 0;
    this.nekretnine.forEach(n => {
      if (n.izdajeIliProdaje == 'izdaje' && n.kucaIliStan == 'stan') this.yLabels34[0]++;
      else if (n.izdajeIliProdaje == 'prodaje' && n.kucaIliStan == 'stan') this.yLabels34[1]++;
      else if (n.izdajeIliProdaje == 'izdaje' && n.kucaIliStan == 'kuca') this.yLabels34[2]++;
      else this.yLabels34[3]++;
    })

  }

  //END CHARTS----------------------------------------------------------------------------------------------


  //ADD PROPERTY

  novaNekretnina: Nekretnina;
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
  dodajNekretninu() {
    this.nekretninaServis.dodajNekretninu(this.novaNekretnina).subscribe((res) => {
      // if(res['message']='OK') alert('DODATA NEKRETNINA');
      // else alert('NIJE DODATA NEKRETNINA');
    })
    this.nekretninaServis.dohvatiSveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine = nekretnine;
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
  //APPROVE PROPERTY FOR SALE
  odobriNekretninu(n) {
    this.nekretninaServis.odobriNekretninu(n.id).subscribe((res) => {
      n.odobrena = true;
    })
  }
}


