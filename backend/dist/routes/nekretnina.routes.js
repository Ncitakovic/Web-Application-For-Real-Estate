"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nekretnina_controller_1 = require("../controllers/nekretnina.controller");
const nekretninaRouter = express_1.default.Router();
nekretninaRouter.route('/pretraga').post((req, res) => new nekretnina_controller_1.NekretninaController().pretraga(req, res));
nekretninaRouter.route('/dohvatiNekretninuPoId').post((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiNekretninuPoId(req, res));
nekretninaRouter.route('/dodajNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().dodajNekretninu(req, res));
nekretninaRouter.route('/dohvatiNekretnine').post((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiNekretnine(req, res));
nekretninaRouter.route('/dohvatiSveNekretnine').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiSveNekretnine(req, res));
nekretninaRouter.route('/izmeniNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().izmeniNekretninu(req, res));
nekretninaRouter.route('/promovisiNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().promovisiNekretninu(req, res));
nekretninaRouter.route('/otpromovisiNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().otpromovisiNekretninu(req, res));
nekretninaRouter.route('/dohvatiSvePromovisaneNekretnine').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiSvePromovisaneNekretnine(req, res));
nekretninaRouter.route('/dodeliVlasnika').post((req, res) => new nekretnina_controller_1.NekretninaController().dodeliVlasnika(req, res));
nekretninaRouter.route('/odobriNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().odobriNekretninu(req, res));
nekretninaRouter.route('/seIzdaje').post((req, res) => new nekretnina_controller_1.NekretninaController().seIzdaje(req, res));
nekretninaRouter.route('/obrisiGaleriju').post((req, res) => new nekretnina_controller_1.NekretninaController().obrisiGaleriju(req, res));
exports.default = nekretninaRouter;
//# sourceMappingURL=nekretnina.routes.js.map