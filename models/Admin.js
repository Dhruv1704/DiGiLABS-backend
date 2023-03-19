const mongoose = require('mongoose')
const { Schema } = mongoose;

const adminSchema = new Schema({
    text:{
        type: String
    },
    image:{
        type: String
    }

})

module.exports = mongoose.model('admin',adminSchema);
