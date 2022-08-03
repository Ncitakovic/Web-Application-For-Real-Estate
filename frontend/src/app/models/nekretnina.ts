import { Adresa } from './adresa';
import { Rezervacija } from './rezervacija';

export class Nekretnina{
  id:number;
  naziv:string;
  adresa:Adresa;
  kucaIliStan:string;
  kucaBrSpratova:number;
  stanSprat:number;
  stanUkupnoSpratova:number;
  kvadratura:number;
  brSoba:string;
  jeNamestena:boolean;
  galerija:Array<Object>;
  izdajeIliProdaje:string;
  cena:number;
  vlasnik:number;

  promovisana:boolean;
  odobrena:boolean;

  //rezervacije:Array<Rezervacija>

}
