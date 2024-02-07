import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { constants } from "../utils/constant.js";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            index:true,
            validate:[validator.isEmail,"Please enter a valid email!!"]
        },
        password:{
            type:String,
            // required:[true,"Please enter your password"],
            // minLength:[6,"Password should be greater than 6 characters"],
            select:false
        },
        name:{
            type:String
        },
        google_id:{
            type:String
        },
        google_picture:{
            type:String
        }


},{timestamps:true})

// Hash password before saving 
// userSchema.pre("save",async (next)=>{
//     if(this.password ){
//         if( this.isModified(this.password)){
//             this.password = await bcrypt.hash(this.password,10)
//         }   
//     }
//     next()
    
// })


//Generate JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id,email:this.email},constants.secret_key,{
        expiresIn:"1d",
    })
}


//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    let isMatch= await bcrypt.compare(enteredPassword, this.password);
     return  isMatch        
}

const User = mongoose.model("User",userSchema)

export {User}

