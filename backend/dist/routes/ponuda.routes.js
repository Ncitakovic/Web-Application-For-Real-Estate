"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ponuda_controller_1 = require("../controllers/ponuda.controller");
const ponudaRouter = express_1.default.Router();
ponudaRouter.route('/kreirajPonudu').post((req, res) => new ponuda_controller_1.PonudaController().kreirajPonudu(req, res));
ponudaRouter.route('/dohvatiPonude').post((req, res) => new ponuda_controller_1.PonudaController().dohvatiPonude(req, res));
ponudaRouter.route('/odobriPonudu').post((req, res) => new ponuda_controller_1.PonudaController().odobriPonudu(req, res));
ponudaRouter.route('/ukloniPonuduZaNekretninu').post((req, res) => new ponuda_controller_1.PonudaController().ukloniPonuduZaNekretninu(req, res));
ponudaRouter.route('/dohvatiPonudeRez').post((req, res) => new ponuda_controller_1.PonudaController().dohvatiPonudeRez(req, res));
ponudaRouter.route('/dohvatiId').get((req, res) => new ponuda_controller_1.PonudaController().dohvatiId(req, res));
exports.default = ponudaRouter;
//# sourceMappingURL=ponuda.routes.js.map