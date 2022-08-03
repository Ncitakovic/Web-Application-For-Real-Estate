import express from 'express'
import { Request, Response } from 'express-serve-static-core';
import Nekretnina from '../models/nekretnina';
import Ponuda from '../models/ponuda';
export class PonudaController{

    kreirajPonudu = (req:express.Request,res:express.Response) =>{
        // let idp = req.body.idp;
        let ponuda = new Ponuda(req.body.ponuda);

        ponuda.save().then((p)=>{
            res.json({'message':'dodata ponuda'})
        }).catch((err)=>{
            console.log(err)
        })
        // Ponuda.find({},(err,ponude)=>{
        //     if(err) console.log(err)
        //     else{
        //         let id = ponude.length+1;
        //         let ponuda = new Ponuda(req.body.ponuda)
        //         ponuda.id = id;
                
        //         ponuda.save().then((rez)=>{
        //             res.json({'message':'ok'})
        //         }).catch((err)=>{
        //             res.json(err)
        //         })
        //     }
            
        // })

    }

    dohvatiId = (req: express.Request, res: express.Response)=>{
        Ponuda.findOne({},(err,pon)=>{
            if(err) console.log(err)
            else{
                res.json(pon);
            }
        }).sort({'id':-1}).limit(1)
    }


    dohvatiPonude = (req:express.Request, res: express.Response) => {
        let idV = req.body.id;
        console.log(idV)
        Ponuda.find({'idV':idV},(err,ponude)=>{
            if(err) console.log(err)
            else res.json(ponude);
        })
    }
    odobriPonudu = (req:express.Request, res: express.Response) => {
        let ponuda = req.body.ponuda;
        Ponuda.collection.updateOne({'ponuda':ponuda},{$set:{'odobrena':true}},(err,result)=>{
            if(err) console.log(err);
            else res.json({'message':'uspesno odobrena'});
        });        
        
    }

    ukloniPonuduZaNekretninu = (req:express.Request, res: express.Response) => {
        let id = req.body.id;
        Ponuda.collection.deleteOne({'id':id},(err,result)=>{
            res.json({'message':'deleted'});
        });
        

    }


    dohvatiPonudeRez = (req:express.Request, res: express.Response) => {
        let idK = req.body.id;
        Ponuda.find({'idK':idK,'odobrena':true},(err,ponude)=>{
            if(err) console.log(err)
            else res.json(ponude);
        })
    }





}