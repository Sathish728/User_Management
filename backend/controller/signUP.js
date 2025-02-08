const bcrypt=require("bcryptjs")
const User=require("../model/userModel")
const createUser=("/register", async (req, res) => {
    try {
      const { first_name,email, password } = req.body;
      const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new User({ first_name,email, password: hashedPassword,role:"customer" });
      const savedUser=await newUser.save();
      res.status(201).json({message:"User registered successfully",user:savedUser});
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  module.exports={createUser}