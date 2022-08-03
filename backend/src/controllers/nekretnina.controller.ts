import express, { json } from 'express';
import { Request, Response } from 'express-serve-static-core';
import nekretnina from '../models/nekretnina';
import Nekretnina from '../models/nekretnina';

export class NekretninaController{
    pretraga = (req:express.Request,res:express.Response) => {
        let grad = req.body.grad;
        let cenaOd = req.body.cenaOd;
        let cenaDo = req.body.cenaDo;

        Nekretnina.find(
            // {$and:[
                {$and:[{$and: [
                    {'adresa.grad':grad},{'cena': {$gt: cenaOd,$lt:cenaDo}}
                ]},{'odobrena':true}]}
                //  ,
                // {'odobrena':true} 
            // ]}                        
            ,(err,podaci)=>{
            if(err) console.log(err);
            else{
                return res.json(podaci);
            }
        })


    }
    dohvatiNekretninuPoId = (req: express.Request, res: express.Response)=>{
        let id=  req.body.id;

        Nekretnina.findOne({'id':id}, (err, nekretnina)=>{
            if(err) console.log(err);
            else res.json(nekretnina)
        })
    }
    dodajNekretninu = (req: express.Request, res: express.Response)=>{
        Nekretnina.find({},(err,nekretnine)=>{
            if(err) console.log(err);
            else {
                let id = nekretnine.length+1;
                let n = new Nekretnina(req.body.nekretnina);
                n.id = id;
                n.save().then(nar =>{
                    res.json({'message':'OK'})
                }).catch(err=>{
                    res.json(err);
                })
            }                
        })

    }
    dohvatiNekretnine = (req:express.Request,res:express.Response)=>{
        let id = req.body.id;
        Nekretnina.find({'vlasnik':id},(err,nekretnine)=>{
            if(err) console.log(err);
            else res.json(nekretnine);
            
        })
    }
    dohvatiSveNekretnine = (req:express.Request,res:express.Response)=>{
        Nekretnina.find({},(err,nekretnine)=>{
            if(err) console.log(err);
            else res.json(nekretnine);            
        })
    }



    izmeniNekretninu = (req:express.Request,res:express.Response)=>{
        let n = new Nekretnina(req.body.nekretnina);
        let id = n.id;
        nekretnina.collection.deleteOne({'id':id});
        n.save().then((n)=>{
            res.json({'message':'OK'})
        }).catch((err)=>{
            res.json({'message':'NOT OK'})
        })
    }



    //AGENT-(NE)PROMOVISANJE NEKRETNINA
    promovisiNekretninu=(req: express.Request,res:express.Response)=>{
        let id = req.body.id;
        console.log(id);
        Nekretnina.updateOne({'id':id},{$set:{'promovisana':true}},(err,rez)=>{
            if(err) console.log(err)
            else
                res.json({'message':'promovisana'})    
        });
        
    }
    otpromovisiNekretninu=(req: express.Request,res:express.Response)=>{
        let id = req.body.id;
        Nekretnina.updateOne({'id':id},{$set:{'promovisana':false}},(err,rez)=>{
            if(err) console.log(err)
            else
                res.json({'message':'otpromovisana'})    
        });
    }

    dohvatiSvePromovisaneNekretnine =(req: express.Request,res:express.Response)=>{
        Nekretnina.find({'promovisana':true},(err,nekretnine)=>{
            if(err) console.log(err)
            else res.json(nekretnine)
        })

    }

    //dodeljivanje vlasnika nekretnine korisniku koji je dao ponudu
    //PROVERITI ISPRAVNOST DA LI RADI
    dodeliVlasnika = (req: express.Request,res:express.Response)=>{
        let idN = req.body.idN;
        let idK = req.body.idK;
        Nekretnina.collection.updateOne({'id':idN,'izdajeIliProdaje':'prodaje'},{$set:{'vlasnik':idK}},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message': 'dodeljena nekretnina korisniku'})
        })
    }

    //ZA AGENTA
    odobriNekretninu = (req:express.Request,res:express.Response) => {
        let id = req.body.id;
        console.log(id);
        Nekretnina.updateOne({'id':id},{$set:{'odobrena':true}},(err,rez)=>{
            if(err) console.log(err)
            else
                 res.json({'message':'odobrena'})
        });
    }

    seIzdaje= (req:express.Request,res:express.Response) => {
        let id = req.body.id;
        Nekretnina.findOne({'id':id,'izdajeIliProdaje':'izdaje'},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message':'izdaje'})
        })
    }


    obrisiGaleriju = (req:express.Request,res:express.Response) => {
        let id = req.body.n.id;
        let galerija = req.body.n.galerija;
        Nekretnina.collection.updateOne({'id':id},{$set:{'galerija':galerija}},(err,result)=>{
            if(err) console.log(err)
            else res.json({'message':'galerija obrisana'})
        })
    }

}