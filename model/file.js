const mongoose = require("mongoose")

const fileschema =new mongoose.Schema ({
    originalname : {
        type : String,
    },
    newfilename : {
        type : String,
    },
    path : {
        type : String
    }
})

const filemodel = mongoose.model("files", fileschema)

module.exports = filemodel;