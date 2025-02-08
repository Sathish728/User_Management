const express=require("express")
const router=express.Router()
const signupController=require("../controller/signUP")

router.post("/register",signupController.createUser)

module.exports=router