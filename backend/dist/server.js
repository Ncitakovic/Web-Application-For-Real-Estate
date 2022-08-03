"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const nekretnina_routes_1 = __importDefault(require("./routes/nekretnina.routes"));
const rezervacija_routes_1 = __importDefault(require("./routes/rezervacija.routes"));
const ponuda_routes_1 = __importDefault(require("./routes/ponuda.routes"));
const app = express_1.default();
// let corsOptions={
//     origin:"http://localhost:4200",
//     optionsSuccessStatus:200,
// }
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo ok');
});
const router = express_1.default.Router();
router.use('/korisnici', korisnik_routes_1.default);
router.use('/nekretnine', nekretnina_routes_1.default);
router.use('/rezervacije', rezervacija_routes_1.default);
router.use('/ponude', ponuda_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//MULTER
app.get("/", (req, res) => {
    res.send("welcome to express");
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/frontend/app/src/assets');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});
//       cb(null, `${Date.now()}_${file.originalname}`)
const upload = multer_1.default({ storage });
app.post("/file", upload.single("file"), (req, res) => {
    const file = req.file;
    if (file) {
        res.json(file);
    }
    else {
        throw new Error("File upload unsuccessful");
    }
});
app.post("/multifiles", upload.array("files"), (req, res) => {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
        res.json(files);
    }
    else {
        throw new Error("File upload unsuccessful");
    }
});
//# sourceMappingURL=server.js.map