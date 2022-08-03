import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rezervacija = new Schema(
    {
        idN:{
            type: Number
        },
        datumOd:{
            type: Date
        },
        datumDo:{
            type:Date
        }

    }

);

export default mongoose.model('Rezervacija', Rezervacija, 'rezervacije');