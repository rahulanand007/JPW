import express from "express"
import cors from "cors"
import { connectDatabase } from "./config/database.js"
import {router as user} from "./router/userRouter.js"
import {router as googleAauth} from "./router/googleAuth.js"
import { router as profile } from "./router/profileRouter.js"
import { constants } from "./utils/constant.js"
import passport from "passport"
import cookieParser from "cookie-parser"


const app = express()


//for google login
app.use(passport.initialize());
import "./services/googleStrategy.js"


//To make uploads folder accessible through URL
app.use('/uploads', express.static('./uploads'));


//parse json data in request body
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: constants.frontend_url, // Replace with frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  }))

connectDatabase()

app.get("/",(req,res)=>{
    res.send({message:"welcome to JPW"})
})

//Route imports
app.use('/api/v1/user',user)
app.use("/auth",googleAauth)
app.use('/api/v1/profile',profile)



export default app


