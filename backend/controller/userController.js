const User = require("../model/userModel");
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");

const uploadUsers = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const users = await Promise.all(
      data.map(async (row) => ({
        first_name: row["First Name"],
        last_name: row["Last Name"],
        password: await bcrypt.hash(row["Password"], 10), 
        role: row["Role"],
        dob: new Date(row["DOB"]),
        gender: row["Gender"],
        email: row["Email"],
        mobile: row["Mobile"],
        city: row["City"],
        state: row["State"],
      }))
    );

    await User.insertMany(users);
    res.status(201).json({ message: "Users uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const exportUsers = async (req, res) => {
  try {
    const users = await User.find().select("-_id -__v"); 

    
    const cleanedUsers = users.map(user => {
      const { $__ , $isNew, _doc, ...cleanedUser } = user.toObject(); 
      return cleanedUser;
    });

    console.log("Cleaned Users:", cleanedUsers); 
    
    if (!cleanedUsers || cleanedUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const worksheet = xlsx.utils.json_to_sheet(cleanedUsers);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Users");
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = { uploadUsers, exportUsers };
