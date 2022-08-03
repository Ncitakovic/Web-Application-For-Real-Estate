"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// var validatePassword = function(lozinka) {
//     var re = /^(?=.{8,24}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*?!:;])(?:([\w\d*?!:;])\1?\1?(?!\1))+$/;
//     return re.test(lozinka)
// };
let Korisnik = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String,
        unique: true
    },
    lozinka: {
        type: String,
    },
    slika: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    },
    grad: {
        type: String
    },
    drzava: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    odbijen: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnici');
//# sourceMappingURL=korisnik.js.map