import bcrypt from "bcrypt"
import { constants } from "./constant.js";

const hashPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}

const sendToken = async(res, user, statusCode) => {
    let token = user.getJwtToken()
  
    //options for cookie
    const options = {
      expires: new Date(Date.now() + constants.cookie_expire * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };

export {hashPassword,sendToken}