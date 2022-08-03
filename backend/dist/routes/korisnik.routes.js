"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/prijava').post((req, res) => new korisnik_controller_1.KorisnikController().prijava(req, res));
korisnikRouter.route('/registracija').post((req, res) => new korisnik_controller_1.KorisnikController().registracija(req, res));
korisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
korisnikRouter.route('/promeniPodatke').post((req, res) => new korisnik_controller_1.KorisnikController().promeniPodatke(req, res));
korisnikRouter.route('/dohvatiKorisnike').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnike(req, res));
korisnikRouter.route('/odobriKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().odobriKorisnika(req, res));
korisnikRouter.route('/odbijKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().odbijKorisnika(req, res));
korisnikRouter.route('/obrisiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().obrisiKorisnika(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map