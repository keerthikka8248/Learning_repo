const mongoose = require("mongoose")

const Userdetail_Schema = mongoose.Schema({
    
    username:{
        type : String
    },
    emailid:{
        type : String
    },
    password:{
        type : String
    }
},{ versionKey: false })
const User = mongoose.model('Userdetails',Userdetail_Schema)
module.exports = {User} 