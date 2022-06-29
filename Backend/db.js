const mongoose = require("mongoose");
const mongoURI ='mongodb+srv://chikzxz:buletchali@cluster0.bau4h.mongodb.net/Notebook?retryWrites=true&w=majority';

  


const connectToMongo =() =>{
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected to Mongose");
    })
}


module.exports = connectToMongo


// "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";