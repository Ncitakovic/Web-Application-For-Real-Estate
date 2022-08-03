import express from 'express';
import multer from 'multer'
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import nekretninaRouter from './routes/nekretnina.routes';
import rezervacijaRouter from './routes/rezervacija.routes';
import ponudaRouter from './routes/ponuda.routes';

const app = express();

// let corsOptions={
//     origin:"http://localhost:4200",
//     optionsSuccessStatus:200,
// }

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekat');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();
router.use('/korisnici', korisnikRouter)
router.use('/nekretnine',nekretninaRouter)
router.use('/rezervacije',rezervacijaRouter)
router.use('/ponude',ponudaRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

//MULTER

app.get("/",(req,res)=>{
    res.send("welcome to express")
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null,'../frontend/frontend/app/src/assets')
    },
    filename: function (req, file, cb) {
       cb(null, `${file.originalname}`)
    }
});
//       cb(null, `${Date.now()}_${file.originalname}`)
const upload = multer({storage});

app.post("/file",upload.single("file"),(req,res)=>{
    const file = req.file;
    if(file){
        res.json(file);
    }else{
        throw new Error("File upload unsuccessful");
    }
});

app.post("/multifiles",upload.array("files"),(req,res)=>{
    const files = req.files;
    if(Array.isArray(files) && files.length>0){
        res.json(files);
    }else{
        throw new Error("File upload unsuccessful");
    }
});
