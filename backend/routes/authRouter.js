const  {getUser}=require("../controller/authController")
const {authenticateToken}=require("../utils/authmiddleware")
const { updateProfile, deleteProfile } = require("../controller/authController")
const express=require("express")

const router=express.Router()

router.get("/profile",authenticateToken,getUser)
router.put("/update", authenticateToken, updateProfile);
router.delete("/delete", authenticateToken, deleteProfile);
module.exports=router