import {User} from '../models/user.js'

const register = async(req, res)=>{
    try {
       const {email,password} = req.body 
       
    } catch (error) {
        console.log(error)
    }
}


export {register}