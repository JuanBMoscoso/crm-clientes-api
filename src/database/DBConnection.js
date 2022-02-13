const mongoose = require("mongoose")

const uri = "mongodb://127.0.0.1:27017/CRM-CLIENES-API"

const DBConnection = async()=>{
    try{
        await mongoose.connect(uri)
        console.log("DB is connected")
    } catch(error) {
        console.log(error)
        throw new Error("Failed to initialize database")
    }
}

module.exports = DBConnection;