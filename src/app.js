import express from "express"
import cors from "cors"
import { connectDatabase } from "./config/database.js"
import {router as user} from "./router/userRouter.js"
import { router as auth } from "./router/authRouter.js"
import passportStrategy from "./passport.js"
import { constants } from "./utils/constant.js"
import passport from "passport"
import session from "express-session"

const app = express()

//For login through google
app.use(session({ 
    secret: constants.secret_key,
    resave: true,
    saveUninitialized: true
  }))
app.use(passport.initialize());
app.use(passport.session());


//parse jason data in request body
app.use(express.json())

app.use(cors())

connectDatabase()

app.get("/",(req,res)=>{
    res.send({message:"welcome to JPW"})
})

//Route imports
app.use('/api/v1/user',user)
app.use("/auth",auth)



export default app


