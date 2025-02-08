const User=require("../model/userModel")


const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
      const { first_name, last_name, email,role,dob,city,state,gender,mobile } = req.body;
      const user = await User.findByIdAndUpdate(
          req.user.id,
          { first_name, last_name, email,role,dob,city,state,gender,mobile },
          { new: true }
      ).select("-password");

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  module.exports={updateProfile, deleteProfile,getUser}