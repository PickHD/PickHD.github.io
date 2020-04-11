//! ----USER MODEL----

//!import library mongoose
const mongoose = require('mongoose')

//!creating user schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        },
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true,
    },
},
{
    timestamps:true
})

//!exporting model
module.exports = mongoose.model('user',userSchema)
