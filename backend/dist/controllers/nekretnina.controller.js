"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
const nekretnina_2 = __importDefault(require("../models/nekretnina"));
class NekretninaController {
    constructor() {
        this.pretraga = (req, res) => {
            let grad = req.body.grad;
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            nekretnina_2.default.find(
            // {$and:[
            { $and: [{ $and: [
                            { 'adresa.grad': grad }, { 'cena': { $gt: cenaOd, $lt: cenaDo } }
                        ] }, { 'odobrena': true }] }
            //  ,
            // {'odobrena':true} 
            // ]}                        
            , (err, podaci) => {
                if (err)
                    console.log(err);
                else {
                    return res.json(podaci);
                }
            });
        };
        this.dohvatiNekretninuPoId = (req, res) => {
            let id = req.body.id;
            nekretnina_2.default.findOne({ 'id': id }, (err, nekretnina) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnina);
            });
        };
        this.dodajNekretninu = (req, res) => {
            nekretnina_2.default.find({}, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else {
                    let id = nekretnine.length + 1;
                    let n = new nekretnina_2.default(req.body.nekretnina);
                    n.id = id;
                    n.save().then(nar => {
                        res.json({ 'message': 'OK' });
                    }).catch(err => {
                        res.json(err);
                    });
                }
            });
        };
        this.dohvatiNekretnine = (req, res) => {
            let id = req.body.id;
            nekretnina_2.default.find({ 'vlasnik': id }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiSveNekretnine = (req, res) => {
            nekretnina_2.default.find({}, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.izmeniNekretninu = (req, res) => {
            let n = new nekretnina_2.default(req.body.nekretnina);
            let id = n.id;
            nekretnina_1.default.collection.deleteOne({ 'id': id });
            n.save().then((n) => {
                res.json({ 'message': 'OK' });
            }).catch((err) => {
                res.json({ 'message': 'NOT OK' });
            });
        };
        //AGENT-(NE)PROMOVISANJE NEKRETNINA
        this.promovisiNekretninu = (req, res) => {
            let id = req.body.id;
            console.log(id);
            nekretnina_2.default.updateOne({ 'id': id }, { $set: { 'promovisana': true } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'promovisana' });
            });
        };
        this.otpromovisiNekretninu = (req, res) => {
            let id = req.body.id;
            nekretnina_2.default.updateOne({ 'id': id }, { $set: { 'promovisana': false } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'otpromovisana' });
            });
        };
        this.dohvatiSvePromovisaneNekretnine = (req, res) => {
            nekretnina_2.default.find({ 'promovisana': true }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        //dodeljivanje vlasnika nekretnine korisniku koji je dao ponudu
        //PROVERITI ISPRAVNOST DA LI RADI
        this.dodeliVlasnika = (req, res) => {
            let idN = req.body.idN;
            let idK = req.body.idK;
            nekretnina_2.default.collection.updateOne({ 'id': idN, 'izdajeIliProdaje': 'prodaje' }, { $set: { 'vlasnik': idK } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'dodeljena nekretnina korisniku' });
            });
        };
        //ZA AGENTA
        this.odobriNekretninu = (req, res) => {
            let id = req.body.id;
            console.log(id);
            nekretnina_2.default.updateOne({ 'id': id }, { $set: { 'odobrena': true } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'odobrena' });
            });
        };
        this.seIzdaje = (req, res) => {
            let id = req.body.id;
            nekretnina_2.default.findOne({ 'id': id, 'izdajeIliProdaje': 'izdaje' }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'izdaje' });
            });
        };
        this.obrisiGaleriju = (req, res) => {
            let id = req.body.n.id;
            let galerija = req.body.n.galerija;
            nekretnina_2.default.collection.updateOne({ 'id': id }, { $set: { 'galerija': galerija } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'galerija obrisana' });
            });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map