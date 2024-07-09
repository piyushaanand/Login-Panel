const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/Login")
.then(()=>{
console.log(`Connected`)
}).catch((e) =>{
    console.log(`No Connection ${e}`)
})

//Create Scheme 
const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//Collection Part
const collection = new mongoose.model("users",LoginSchema)
module.exports=collection