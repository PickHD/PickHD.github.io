//! ----POST MODEL----

//!import library mongoose
const mongoose = require('mongoose')

//!create post schema
const postSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        max: 255
    },
    posts:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})

//!export model
module.exports = mongoose.model('post',postSchema)
