"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RezervacijaController = void 0;
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
class RezervacijaController {
    constructor() {
        this.postojiRezervacija = (req, res) => {
            let idN = req.body.rez.idN;
            let datumOd = req.body.rez.datumOd;
            let datumDo = req.body.rez.datumDo;
            let _datumOd = datumOd.toISOString();
            let _datumDo = datumDo.toISOString();
            //console.log('-------');
            console.log(req.body.rez.datumOd);
            console.log(req.body.rez.datumDo);
            // console.log(_datumOd);
            // console.log(_datumDo);
            //console.log('-------');
            // let d1 = new Date(datumOd)
            // let d2 = new Date(datumDo)
            rezervacija_1.default.find({ 'idN': idN,
                $or: [{ 'datumOd': { $gte: _datumOd, $lte: _datumDo } },
                    { 'datumDo': { gte: _datumOd, $lte: _datumDo } }] }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    if (rez) {
                        res.json({ 'message': 'YES' });
                    }
                    else {
                        res.json({ 'message': 'NO' });
                    }
                }
            });
        };
        this.ubaciRezervaciju = (req, res) => {
            let rez = new rezervacija_1.default(req.body.rez);
            console.log(req.body.rez.idN);
            console.log(req.body.rez.datumOd);
            console.log(req.body.rez.datumDo);
            rez.save().then((rez) => {
                res.json({ 'message': 'YES' });
            }).catch(err => {
                res.json(err);
            });
        };
        this.dohvatiSveRezervacije = (req, res) => {
            let idN = req.body.idN;
            rezervacija_1.default.find({ 'idN': idN }, (err, rezervacije) => {
                if (err)
                    console.log(err);
                else
                    res.json(rezervacije);
            });
        };
        // postojiVecRezervacija(datumOd,datumDo):boolean{
        //     for(let r of this.rezervacije){
        //       if((datumOd > r.datumOd && datumOd< r.datumDo)  ||   (datumDo>r.datumOd && datumDo<r.datumDo))
        //         return true;
        //     }
        //     return false;
        //   }
    }
}
exports.RezervacijaController = RezervacijaController;
//# sourceMappingURL=rezervacija.controller.js.map