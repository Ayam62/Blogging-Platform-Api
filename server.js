
import dotenv from "dotenv"

import express from "express"
import uploadRouter from "./routes/adminRoutes/uploadImageRoutes.js";
import connectDB from "./configs/db.js";
import postRouter from "./routes/adminRoutes/postRoutes.js";
import authRouter from "./routes/authRoutes/authRouter.js";
import userRouter from "./routes/adminRoutes/userRoute.js";

dotenv.config();

const app=express();
const PORT= process.env.PORT || 8000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes for admin
app.use("/api/auth",authRouter)
app.use("/api/uploads",uploadRouter)
app.use("/api/posts",postRouter)
app.use("/api/user", userRouter)

//mongodb connection function call
connectDB();

app.get("/",(req,res)=>{
    res.send("Hello world")
})
//listening to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})





