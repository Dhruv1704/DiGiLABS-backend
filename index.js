const express = require('express');
const connectToMongo = require("./db");
const Admin = require("./models/Admin");
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

connectToMongo()

app.use(cors())
app.use(express.json())


app.get('/',async (req,res)=>{
    const admin = await Admin.find()
    const data = admin[0]
    app.use(express.json())
    res.json(data)
})

app.use('/admin',require('./routes/admin'))

app.listen(port,()=>{
    console.log(`App listening on https://digilabs-backend.vercel.app/`)
})