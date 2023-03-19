const mongoose = require('mongoose')

const monoURI = "mongodb+srv://Dhruv:123456DSN.@cluster0.fxwfygr.mongodb.net/digilabs";

const connectToMongo = ()=>{
    mongoose.connect(monoURI).then(()=>console.log("connection success"))
        .catch((err)=>console.log(err));
}

module.exports = connectToMongo;