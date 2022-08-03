import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import korisnik from '../models/korisnik';
import Korisnik from '../models/korisnik';

export class KorisnikController{
    
    prijava = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        // let tip = req.body.tip;

        Korisnik.findOne({'kor_ime':kor_ime, 'lozinka': lozinka,'odobren':true},
            (err, korisnik)=>{
                if(err) console.log(err);
                else res.json(korisnik);
            })
    }
    registracija = (req: express.Request, res: express.Response)=>{


        let kor_ime :string = req.body.korisnik.kor_ime;
        let mail :string = req.body.korisnik.mail;
        
        Korisnik.findOne({$or :[{'kor_ime':kor_ime},{'adresa_poste':mail}]},(err,kor)=>{
            if(err) console.log(err);
            else { 
                if(!kor){
                    Korisnik.find({},(err,korisnici)=>{
                        
                        let id = korisnici.length+1;
                        let korisnik = new Korisnik(req.body.korisnik);
                        korisnik.id=id;
                        korisnik.save().then((kor)=>{
                            res.json({'message':'korisnik dodat'});
    
                        }).catch((err)=>{
                            res.json({'message':'greska pri dodavanju'})
    
                        })
                    })
                    
                }else{
                    res.json({'message':'postoji'})

                }


            }
        })        
    }

    promeniLozinku = (req: Request, res: Response) => {
        let kor_ime = req.body.kor_ime;
        let stara_lozinka = req.body.stara_lozinka;
        let nova_lozinka = req.body.nova_lozinka;
        console.log(kor_ime);
        console.log(stara_lozinka);
        console.log(nova_lozinka);
        Korisnik.findOneAndUpdate({'kor_ime':kor_ime,'lozinka':stara_lozinka},{$set:{'lozinka':nova_lozinka}},(err,result)=>{
            if(err) console.log(err);
            else return res.json(result);
        });
        
        // return res.json({'message':'uspesno'});
    }
    promeniPodatke = (req:express.Request,res:express.Response)=>{
        
        let kor = new Korisnik(req.body.korisnik);
        let kor_ime_ulogovan = req.body.kor_ime_ulogovan;
        

        korisnik.collection.deleteOne({kor_ime:kor_ime_ulogovan});
        kor.save().then((user)=>{
            res.status(200).json({'message':'user changed'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })

    }   

    dohvatiKorisnike = (req:express.Request,res:express.Response)=>{
        Korisnik.find({},(err,korisnici)=>{
            if(err) console.log(err);
            else res.json(korisnici);
        })
    }


    //ODOBRAVANJE ODBIJANJE KORISNIKA OD STRANE ADMIN-a
    odobriKorisnika = (req:express.Request,res:express.Response)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.collection.updateOne({'kor_ime':kor_ime},{$set:{'odobren':true}},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message':'korisnik odobren'})
        })
    }
    odbijKorisnika = (req:express.Request,res:express.Response)=>{
        let id = req.body.id;
        Korisnik.collection.updateOne({'id':id},{$set:{'odbijen':true}},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message':'korisnik odbijen'})
        })
    }

    obrisiKorisnika = (req:express.Request, res:express.Response)=>{
        let id = req.body.id;
        Korisnik.collection.deleteOne({'id':id},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message':'obrisan'})
        })
    }

    izmeniSlikuKorisnika = (req:express.Request,res:express.Response)=>{
        let id = req.body.id;
        let slika = req.body.slika;
        

    }

}