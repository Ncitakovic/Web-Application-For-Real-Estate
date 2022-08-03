"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PonudaController = void 0;
const ponuda_1 = __importDefault(require("../models/ponuda"));
class PonudaController {
    constructor() {
        this.kreirajPonudu = (req, res) => {
            // let idp = req.body.idp;
            let ponuda = new ponuda_1.default(req.body.ponuda);
            ponuda.save().then((p) => {
                res.json({ 'message': 'dodata ponuda' });
            }).catch((err) => {
                console.log(err);
            });
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
        };
        this.dohvatiId = (req, res) => {
            ponuda_1.default.findOne({}, (err, pon) => {
                if (err)
                    console.log(err);
                else {
                    res.json(pon);
                }
            }).sort({ 'id': -1 }).limit(1);
        };
        this.dohvatiPonude = (req, res) => {
            let idV = req.body.id;
            console.log(idV);
            ponuda_1.default.find({ 'idV': idV }, (err, ponude) => {
                if (err)
                    console.log(err);
                else
                    res.json(ponude);
            });
        };
        this.odobriPonudu = (req, res) => {
            let ponuda = req.body.ponuda;
            ponuda_1.default.collection.updateOne({ 'ponuda': ponuda }, { $set: { 'odobrena': true } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'uspesno odobrena' });
            });
        };
        this.ukloniPonuduZaNekretninu = (req, res) => {
            let id = req.body.id;
            ponuda_1.default.collection.deleteOne({ 'id': id }, (err, result) => {
                res.json({ 'message': 'deleted' });
            });
        };
        this.dohvatiPonudeRez = (req, res) => {
            let idK = req.body.id;
            ponuda_1.default.find({ 'idK': idK, 'odobrena': true }, (err, ponude) => {
                if (err)
                    console.log(err);
                else
                    res.json(ponude);
            });
        };
    }
}
exports.PonudaController = PonudaController;
//# sourceMappingURL=ponuda.controller.js.map