import express from 'express';
import { PonudaController } from '../controllers/ponuda.controller';

const ponudaRouter = express.Router();

ponudaRouter.route('/kreirajPonudu').post(
    (req,res) => new PonudaController().kreirajPonudu(req,res)
)
ponudaRouter.route('/dohvatiPonude').post(
    (req,res) => new PonudaController().dohvatiPonude(req,res)
)
ponudaRouter.route('/odobriPonudu').post(
    (req,res) => new PonudaController().odobriPonudu(req,res)
)
ponudaRouter.route('/ukloniPonuduZaNekretninu').post(
    (req,res) => new PonudaController().ukloniPonuduZaNekretninu(req,res)
)
ponudaRouter.route('/dohvatiPonudeRez').post(
    (req,res) => new PonudaController().dohvatiPonudeRez(req,res)
)
ponudaRouter.route('/dohvatiId').get(
    (req,res) => new PonudaController().dohvatiId(req,res)
)

export default ponudaRouter;