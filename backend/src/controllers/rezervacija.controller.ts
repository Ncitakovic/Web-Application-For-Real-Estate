import express, { json } from 'express';
import Rezervacija from '../models/rezervacija';

export class RezervacijaController{
    postojiRezervacija = (req:express.Request, res:express.Response)=>{
        let idN = req.body.rez.idN;
        let datumOd :Date = req.body.rez.datumOd;
        let datumDo :Date = req.body.rez.datumDo;

        let _datumOd  = datumOd.toISOString();
        let _datumDo  = datumDo.toISOString();
        //console.log('-------');
        console.log(req.body.rez.datumOd);
        console.log(req.body.rez.datumDo);
        // console.log(_datumOd);
        // console.log(_datumDo);
        //console.log('-------');
        // let d1 = new Date(datumOd)
        // let d2 = new Date(datumDo)
        Rezervacija.find({ 'idN':idN, 
                        $or: [{'datumOd': {$gte : _datumOd, $lte:_datumDo}} 
                        , {'datumDo': {gte:_datumOd,$lte:_datumDo}}] }  
                        , (err,rez)=>{
            if(err) console.log(err)
            else{
                if(rez){
                    res.json({'message':'YES'});
                }else{
                    res.json({'message':'NO'})
                }
            }
        })
    }

    ubaciRezervaciju = (req: express.Request, res: express.Response)=>{

        let rez = new Rezervacija(req.body.rez);

        console.log(req.body.rez.idN);
        console.log(req.body.rez.datumOd);
        console.log(req.body.rez.datumDo);

        rez.save().then((rez)=>{
            res.json({'message':'YES'})
        }).catch(err =>{
            res.json(err)
        })
        
    }

    dohvatiSveRezervacije = (req: express.Request, res: express.Response)=>{
        let idN = req.body.idN;
        Rezervacija.find({'idN':idN},(err,rezervacije)=>{
            if(err) console.log(err)
            else res.json(rezervacije)
        })
    }

    // postojiVecRezervacija(datumOd,datumDo):boolean{
    //     for(let r of this.rezervacije){
    //       if((datumOd > r.datumOd && datumOd< r.datumDo)  ||   (datumDo>r.datumOd && datumDo<r.datumDo))
    //         return true;
    //     }
    
    //     return false;
    //   }

}


