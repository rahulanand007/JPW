import { apiResponse } from "../utils/apiResponse.js"
import {Profile} from "../models/profile.js";
import { StatusCodes } from "http-status-codes";
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';


const profileEdit =async(req,res)=>{
    try {
        const { name, age, profession } = req.body;
        const profileFields = {};
        profileFields.user_id = req.user.id;
        if (name) profileFields.name = name;
        if (age) profileFields.age = age;
        if (profession) profileFields.profession = profession;

        // Check if profile picture is uploaded
        if (req.file) {
            profileFields.profile_picture = `/uploads/${req.user.id}/${req.file.filename}`
        }
        // Check if profile exists for the user
        let profile = await Profile.findOne({ user_id: req.user.id });

        

        // If profile exists, update 
        if (profile) {
            //Delete old photo if profile picture update
            const __filename = fileURLToPath(import.meta.url).split("\\src");
            if(req.file){
                fs.unlink(__filename[0]+profile.profile_picture,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    console.log("Old photo with path - "+profile.profile_picture +" deleted")
                })
            }

            profile = await Profile.findOneAndUpdate(
                { user_id: req.user.id },
                { $set: profileFields },
                { new: true }
            );
        }else{
            // If profile does not exist, create a new one
            profile = new Profile(profileFields);
            await profile.save();
        }

        return apiResponse(res,"SUC","Profile Edited Successfully",200,profile)
    } catch (error) {
        console.log(error)
        return apiResponse(res, "ERR", error.message,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


export {profileEdit}

