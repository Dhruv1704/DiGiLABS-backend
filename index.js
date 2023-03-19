const express = require('express');
const connectToMongo = require("./db");
const cors = require('cors')

const Admin =require("./models/Admin")
const fs = require('fs')
const multer = require("multer")

const app = express()
const port = process.env.PORT || 5000;

connectToMongo()

app.use(cors({
    origin: "*",
}))
app.use(express.json())

app.get('/', async (req, res) => {
    const admin = await Admin.find()
    const data = admin[0]
    app.use(express.json())
    res.json(data)
})

// multer initialisation
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

/*admin request  methods */

app.post('/', upload.single('testImage'),(req,res)=>{
    const admin = Admin.create({
        text: req.body.text,
        image:{
            data: fs.readFileSync('uploads/'+ req.file.filename),
            contentType: "image/*"
        }
    }).then((res)=> console.log("Logo and title changed."))
        .catch((e)=> console.log(e,"error has occur"))
    res.json(admin)
})

app.put('/',upload.single('testImage'),async (req, res)=>{
    const data = await Admin.find()
    const admin = await data[0]
    admin.text = req.body.text
    admin.image = {
        data : fs.readFileSync('uploads/'+ req.file.filename),
        contentType: "image/*"
    }
    await admin.save()
    res.json(admin)
})

app.listen(port, () => {
    console.log(`App listening on https://digilabs-backend.vercel.app/`)
})