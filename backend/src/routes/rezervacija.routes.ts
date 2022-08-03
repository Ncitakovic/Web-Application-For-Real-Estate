import express from 'express';
import { RezervacijaController } from '../controllers/rezervacija.controller';

const rezervacijaRouter = express.Router();

rezervacijaRouter.route('/postojiRezervacija').post(
    (req,res) => new RezervacijaController().postojiRezervacija(req,res)
)

rezervacijaRouter.route('/ubaciRezervaciju').post(
    (req,res) => new RezervacijaController().ubaciRezervaciju(req,res)
)


rezervacijaRouter.route('/dohvatiSveRezervacije').post(
    (req,res) => new RezervacijaController().dohvatiSveRezervacije(req,res)
)
export default rezervacijaRouter;