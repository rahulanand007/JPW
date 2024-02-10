import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { apiResponse } from "../utils/apiResponse.js"
import {StatusCodes} from "http-status-codes"
import { constants } from "../utils/constant.js"


const isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies

        if(!token){
            return apiResponse(res,"ERR","Please Login to access this resource",StatusCodes.UNAUTHORIZED)
        }
    
        const decodedData = jwt.verify(token,constants.secret_key)
        let user = await User.findById(decodedData.id)
        if(!user){
            return apiResponse(res,"ERR","Invalid token or user doesn't exist",StatusCodes.BAD_REQUEST)
        }
        req.user =user
    
        next();
        
    } catch (error) {
        console.log(error)
        return apiResponse(res,"ERR","Unathorized",StatusCodes.FORBIDDEN)
    }
}

export {isAuthenticated}