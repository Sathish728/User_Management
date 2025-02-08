const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    role:{
        type:String,
        enum:["admin","customer"],default:"customer"
    },
    dob:String,
    gender:String,
    email:{type:String, unique:true},
    mobile:String,
    city:String,
    state:String,
    password:String,
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
})

const userModel=mongoose.model("User",userSchema)
module.exports=userModel