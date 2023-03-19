const express = require('express')
const Admin =require("../models/Admin")
const fs = require('fs')
const multer = require("multer")

const router = express.Router()

// multer storage

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

router.get('/',(req, res)=>{
    res.json("Admin page")
})

router.post('/', upload.single('testImage'),(req,res)=>{
    const admin = Admin.create({
        text: req.body.text,
        image:{
            data: fs.readFileSync('uploads/'+ req.file.filename),
            contentType: "image/*"
        }
    }).then((res)=> console.log("Logo and title changed."))
        .catch((e)=> console.log(e,"error has occur"))
})

router.put('/',upload.single('testImage'),async (req, res)=>{
    const data = await Admin.find()
    const admin = data[0]
    admin.text = req.body.text
    admin.image = {
        data : fs.readFileSync('uploads/'+ req.file.filename),
        contentType: "image/*"
    }
    await admin.save()
    res.json(admin)
})

module.exports = router;