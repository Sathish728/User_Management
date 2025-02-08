const crypto=require("crypto")

const secretKey=crypto.randomBytes(32).toString("hex")

module.exports=secretKey


// require("dotenv").config();

// module.exports = {
//     secretKey: process.env.JWT_SECRET || "fallback-secret-key",
// };