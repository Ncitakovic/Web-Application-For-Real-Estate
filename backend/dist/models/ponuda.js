"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ponuda = new Schema({
    id: {
        type: Number
    },
    idK: {
        type: Number
    },
    idV: {
        type: Number
    },
    idN: {
        type: Number
    },
    nazivNekretnine: {
        type: String
    },
    ponuda: {
        type: String
    },
    odobrena: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Ponuda', Ponuda, 'ponude');
//# sourceMappingURL=ponuda.js.map