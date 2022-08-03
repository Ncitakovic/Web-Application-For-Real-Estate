import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res)=>new KorisnikController().prijava(req, res)
);
korisnikRouter.route('/registracija').post(
    (req, res)=>new KorisnikController().registracija(req, res)
);
korisnikRouter.route('/promeniLozinku').post(
    (req, res)=>new KorisnikController().promeniLozinku(req, res)
);
korisnikRouter.route('/promeniPodatke').post(
    (req, res)=>new KorisnikController().promeniPodatke(req, res)
);
korisnikRouter.route('/dohvatiKorisnike').get(
    (req, res)=>new KorisnikController().dohvatiKorisnike(req, res)
);
korisnikRouter.route('/odobriKorisnika').post(
    (req, res)=>new KorisnikController().odobriKorisnika(req, res)
);
korisnikRouter.route('/odbijKorisnika').post(
    (req, res)=>new KorisnikController().odbijKorisnika(req, res)
);
korisnikRouter.route('/obrisiKorisnika').post(
    (req, res)=>new KorisnikController().obrisiKorisnika(req, res)
);




export default korisnikRouter;