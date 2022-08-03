import express from 'express';
import { NekretninaController } from '../controllers/nekretnina.controller';


const nekretninaRouter = express.Router();

nekretninaRouter.route('/pretraga').post(
    (req, res)=>new NekretninaController().pretraga(req, res)
)
nekretninaRouter.route('/dohvatiNekretninuPoId').post(
    (req, res)=>new NekretninaController().dohvatiNekretninuPoId(req, res)
)
nekretninaRouter.route('/dodajNekretninu').post(
    (req, res)=>new NekretninaController().dodajNekretninu(req, res)
)
nekretninaRouter.route('/dohvatiNekretnine').post(
    (req, res)=>new NekretninaController().dohvatiNekretnine(req, res)
)
nekretninaRouter.route('/dohvatiSveNekretnine').get(
    (req, res)=>new NekretninaController().dohvatiSveNekretnine(req, res)
)
nekretninaRouter.route('/izmeniNekretninu').post(
    (req, res)=>new NekretninaController().izmeniNekretninu(req, res)
)
nekretninaRouter.route('/promovisiNekretninu').post(
    (req, res)=>new NekretninaController().promovisiNekretninu(req, res)
)
nekretninaRouter.route('/otpromovisiNekretninu').post(
    (req, res)=>new NekretninaController().otpromovisiNekretninu(req, res)
)
nekretninaRouter.route('/dohvatiSvePromovisaneNekretnine').get(
    (req, res)=>new NekretninaController().dohvatiSvePromovisaneNekretnine(req, res)
)
nekretninaRouter.route('/dodeliVlasnika').post(
    (req, res)=>new NekretninaController().dodeliVlasnika(req, res)
)
nekretninaRouter.route('/odobriNekretninu').post(
    (req, res)=>new NekretninaController().odobriNekretninu(req, res)
)

nekretninaRouter.route('/seIzdaje').post(
    (req, res)=>new NekretninaController().seIzdaje(req, res)
)

nekretninaRouter.route('/obrisiGaleriju').post(
    (req, res)=>new NekretninaController().obrisiGaleriju(req, res)
)


export default nekretninaRouter;