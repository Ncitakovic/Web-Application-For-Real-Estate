"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    adresa: {
        type: Object
    },
    kucaIliStan: {
        type: String
    },
    kucaBrSpratova: {
        type: Number
    },
    stanSprat: {
        type: Number
    },
    stanUkupnoSpratova: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    brSoba: {
        type: String,
    },
    jeNamestena: {
        type: Boolean
    },
    galerija: {
        type: Array
    },
    izdajeIliProdaje: {
        type: String
    },
    cena: {
        type: Number
    },
    vlasnik: {
        type: Number
    },
    promovisana: {
        type: Boolean
    },
    odobrena: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map