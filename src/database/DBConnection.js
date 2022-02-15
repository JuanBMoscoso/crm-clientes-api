const mongoose = require("mongoose")
const config = require("../config")

const DBConnection = async()=>{
    try{
        await mongoose.connect(config.mongoURI)
        console.log("DB is connected")
    } catch(error) {
        console.log(error)
        throw new Error("Failed to initialize database")
    }
}

module.exports = DBConnection;