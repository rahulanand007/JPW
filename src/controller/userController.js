import { StatusCodes } from 'http-status-codes'
import { User } from '../models/user.js'
import { apiResponse } from '../utils/apiResponse.js'
import { hashPassword, sendToken } from '../utils/helper.js'

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return apiResponse(res, "ERR", "Email or Password missing!!", StatusCodes.BAD_REQUEST)
        }

        let hashedPassword = await hashPassword(password)

        let newUser = new User({
            email: email,
            password: hashedPassword
        })

        newUser.save().then(()=>{
            return apiResponse(res,"SUC","User Registered Successfully", StatusCodes.CREATED)
        }).catch((error)=>{
            return apiResponse(res, "ERR", error.message,StatusCodes.INTERNAL_SERVER_ERROR,error)
        })

    } catch (error) {
        console.log(error)
        return apiResponse(res, "ERR", error.message,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


const login =async(req,res)=>{
    try {
        let {email,password}= req.body

        if(!email || !password){
            return apiResponse(res, "ERR", "Invalid Credentials", StatusCodes.BAD_REQUEST)

        }
        
        let user = await User.findOne({email}).select("+password")

        if(!user){
            return apiResponse(res, "ERR", "User Doesn't Exist", StatusCodes.BAD_REQUEST)
        }

        if(!user.password){
            return apiResponse(res,"ERR","Google SignIn User. Please signIn with google and change your password",StatusCodes.FORBIDDEN)
        }

        const isPasswordMatch = await user.comparePassword(password)

        if(!isPasswordMatch){
            return apiResponse(res, "ERR", "Invalid Credentials", StatusCodes.BAD_REQUEST)
        }

        sendToken(res,user,200)

    } catch (error) {
        console.log(error)
        return apiResponse(res, "ERR", error.message,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



export { 
    register,
    login
 }