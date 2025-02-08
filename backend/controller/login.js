const bcrypt=require("bcryptjs")
const User=require("../model/userModel")
const {generateToken}=require("../utils/jwtUtils")

const login= async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        {
            throw new error("User not found")
        } 
      const isMatch =await bcrypt.compare(password, user.password);
      if (!isMatch)
        {
            throw new error("Invalid credentials")
        } 
      const token = generateToken(user)
      res.status(200).json({ token:token, user:user});
    } catch (error) {
        console.log(error.message)
      res.status(401).json({message:"Invalid credentials"});
    }
  };

  module.exports={login}