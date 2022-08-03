import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nekretnina = new Schema(
    {   
        id:{
            type: Number
        },
        naziv: {
            type: String
        },
        adresa: {
            type: Object
        },
        kucaIliStan: {
            type: String            
        },
        kucaBrSpratova: {
            type: Number
        },
        stanSprat:{
            type:Number
        },
        stanUkupnoSpratova:{
            type:Number
        },        
        kvadratura :{
            type:Number
        },
        brSoba:{
            type:String,
        },
        jeNamestena:{
            type:Boolean
        },
        galerija:{
            type:Array
        },
        izdajeIliProdaje:{
            type:String
        },
        cena:{
            type:Number
        },
        vlasnik:{
            type:Number
        },
        promovisana:{
            type:Boolean
        },
        odobrena:{
            type:Boolean
        }
    }
);

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnine');