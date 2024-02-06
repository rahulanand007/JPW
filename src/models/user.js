import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

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
            required:[true,"Please enter your password"],
            minLength:[6,"Password should be greater than 6 characters"],
            select:false
        }

},{timestamps:true})

//Hash password before saving 
userSchema.pre("save",async (next)=>{
    if(this.isModified(this.password)){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})


//Generate JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    let isMatch= await bcrypt.compare(enteredPassword, this.password);
     return  isMatch        
}

const User = mongoose.model("User",userSchema)

export {User}

