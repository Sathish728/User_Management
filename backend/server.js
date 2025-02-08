const express=require("express")
const app=express()
const PORT=3500
const cors=require("cors")
const {default:mongoose}=require("mongoose")
const signupRouter = require("./routes/signupRouter")
const loginRouter=require("./routes/loginRouter")
const authRouter=require("./routes/authRouter")
const userRouter=require("./routes/userRouter")
const { createAdmin } = require("./scripts/admin")
require("dotenv").config();
const bodyparser=require("body-parser")




app.use(cors())
// app.use(express.json())
app.use(bodyparser.json())



app.use("/server",signupRouter)
app.use("/server",loginRouter)
app.use("/api",authRouter)
app.use("/api/",userRouter)




mongoose.connect("mongodb://localhost:27017/userlogin",{ useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err)
})
app.listen(PORT,()=>{console.log(`server running on PORT : ${PORT}`)})