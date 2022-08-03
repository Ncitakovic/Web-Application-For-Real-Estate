"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const korisnik_2 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        this.prijava = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            // let tip = req.body.tip;
            korisnik_2.default.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka, 'odobren': true }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.registracija = (req, res) => {
            let kor_ime = req.body.korisnik.kor_ime;
            let mail = req.body.korisnik.mail;
            korisnik_2.default.findOne({ $or: [{ 'kor_ime': kor_ime }, { 'adresa_poste': mail }] }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (!kor) {
                        korisnik_2.default.find({}, (err, korisnici) => {
                            let id = korisnici.length + 1;
                            let korisnik = new korisnik_2.default(req.body.korisnik);
                            korisnik.id = id;
                            korisnik.save().then((kor) => {
                                res.json({ 'message': 'korisnik dodat' });
                            }).catch((err) => {
                                res.json({ 'message': 'greska pri dodavanju' });
                            });
                        });
                    }
                    else {
                        res.json({ 'message': 'postoji' });
                    }
                }
            });
        };
        this.promeniLozinku = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let stara_lozinka = req.body.stara_lozinka;
            let nova_lozinka = req.body.nova_lozinka;
            console.log(kor_ime);
            console.log(stara_lozinka);
            console.log(nova_lozinka);
            korisnik_2.default.findOneAndUpdate({ 'kor_ime': kor_ime, 'lozinka': stara_lozinka }, { $set: { 'lozinka': nova_lozinka } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    return res.json(result);
            });
            // return res.json({'message':'uspesno'});
        };
        this.promeniPodatke = (req, res) => {
            let kor = new korisnik_2.default(req.body.korisnik);
            let kor_ime_ulogovan = req.body.kor_ime_ulogovan;
            korisnik_1.default.collection.deleteOne({ kor_ime: kor_ime_ulogovan });
            kor.save().then((user) => {
                res.status(200).json({ 'message': 'user changed' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.dohvatiKorisnike = (req, res) => {
            korisnik_2.default.find({}, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            });
        };
        //ODOBRAVANJE ODBIJANJE KORISNIKA OD STRANE ADMIN-a
        this.odobriKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_2.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'odobren': true } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'korisnik odobren' });
            });
        };
        this.odbijKorisnika = (req, res) => {
            let id = req.body.id;
            korisnik_2.default.collection.updateOne({ 'id': id }, { $set: { 'odbijen': true } }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'korisnik odbijen' });
            });
        };
        this.obrisiKorisnika = (req, res) => {
            let id = req.body.id;
            korisnik_2.default.collection.deleteOne({ 'id': id }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'obrisan' });
            });
        };
        this.izmeniSlikuKorisnika = (req, res) => {
            let id = req.body.id;
            let slika = req.body.slika;
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map