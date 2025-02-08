const bcrypt=require("bcryptjs")
const User=require("../model/userModel")

const createAdmin=async()=>{
    try {
        const existingAdmin=await User.findOne({email:"admin@gmail.com"})
        if(!existingAdmin){
            const newAdmin=new User({
                email:"admin@gmail.com",
                first_name:"Admin",
                role:"admin",
                password:await bcrypt.hash("admin",10)
            })
            await newAdmin.save()
            console.log("Admin created successfully")
        }else{
            console.log("Admin already exist")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports={createAdmin}