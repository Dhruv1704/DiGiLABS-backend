const express = require('express')
const Admin =require("../models/Admin")
const fs = require('fs')
// const multer = require("multer")

const router = express.Router()

// multer storage

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
//
// const upload = multer({storage:storage})

router.get('/',(req, res)=>{
    res.json("Admin page")
})

router.post('/',(req,res)=>{
    try {
        const admin = Admin.create({
            text: req.body.text,
            image: req.body.testImage
        }).then((res) => console.log("Logo and title changed."))
            .catch((e) => console.log(e, "error has occur"))
    }catch (e){
        res.status(409).json({"message":e})
    }
})

router.put('/',async (req, res)=>{
    try {
        const data = await Admin.find()
        const admin = await data[0]
        admin.text = req.body.text
        admin.image = req.body.testImage
        await admin.save()
        res.json(admin)
    }catch (e){
        res.status(409).json({"message":e})
    }
})

module.exports = router;