const mongoose = require("mongoose")

const uri = "mongodb+srv://Juan:Juan@curso-mosngodb.51bmq.mongodb.net/CRM-CLIENES-API"

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