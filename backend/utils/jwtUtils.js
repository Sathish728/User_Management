const jwt=require("jsonwebtoken")
const  secretKey=require("../configuration/jwtConfig")


const generateToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "1h"})
}

const generateRefreshToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "8d"})
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports={generateToken,generateRefreshToken,verifyToken}