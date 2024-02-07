import jwt from "jsonwebtoken"
import { User } from "../models/user.js"


const isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies

        if(!token){
            return res.status(401).json({status:"ERR",message:"Please Login to access this resource"})
        }
    
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        let user = await User.findById(decodedData.id)
        if(!user){
            return res.status(400).json({status:"ERR",message:"Invalid token or user doesn't exist"})
        }
        req.user =user
    
        next();
        
    } catch (error) {
        console.log(error)
        res.status(403).json({status:"ERR",message:"Unathorized"})
    }
}

export {isAuthenticated}