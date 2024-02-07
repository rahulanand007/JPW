import express from "express"
import cors from "cors"
import { connectDatabase } from "./config/database.js"
import {router as user} from "./router/userRouter.js"
import {router as auth} from "./router/googleAuth.js"
import { constants } from "./utils/constant.js"
import passport from "passport"


const app = express()


app.use(passport.initialize());
import "./services/googleStrategy.js"



//parse jason data in request body
app.use(express.json())

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
app.use("/auth",auth)



export default app


