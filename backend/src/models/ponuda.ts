import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Ponuda = new Schema(

    {   
        id:{
            type:Number
        },
        idK:{
            type: Number
        },
        idV:{
            type: Number
        },
        idN:{
            type: Number
        },
        nazivNekretnine:{
            type: String
        },
        ponuda:{
            type:String
        },
        odobrena:{
            type:Boolean
        }
    }




)


export default mongoose.model('Ponuda', Ponuda, 'ponude');