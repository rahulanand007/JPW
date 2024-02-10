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


const deleteProfile = async (req, res) => {
    try {

        //Have to change this to delete user also if profile deleted
        // Find the profile by user_id
        const profile = await Profile.findOne({ user_id: req.user.id });

        if (!profile) {
            return apiResponse(res, "ERR", "Profile not found", StatusCodes.NOT_FOUND);
        }

        // Delete profile
        await Profile.deleteOne({ user_id: req.user.id });

        // Optionally, delete associated files or data for later phase

        return apiResponse(res, "SUC", "Profile deleted successfully", StatusCodes.OK);
    } catch (error) {
        console.log(error);
        return apiResponse(res, "ERR", error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};



const searchProfile = async (req, res) => {
    try {
        const { name, age, profession } = req.query;

        // Prepare search criteria
        const searchCriteria = {};
        if (name) searchCriteria.name = name;
        if (age) searchCriteria.age = age;
        if (profession) searchCriteria.profession = profession;

        // Search profiles
        const profiles = await Profile.find(searchCriteria);

        if (profiles.length === 0) {
            return apiResponse(res, "SUC", "No profiles found", StatusCodes.OK);
        }

        return apiResponse(res, "SUC", "Profiles found successfully", StatusCodes.OK, profiles);
    } catch (error) {
        console.log(error);
        return apiResponse(res, "ERR", error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const visitProfile = async (req, res) => {
    try {
        const { profileId } = req.params;

        // Update the profile's visits array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { visits: { visitor_id: req.user.id } }
        });

        return apiResponse(res, "SUC", "Profile visited successfully", StatusCodes.OK);
    } catch (error) {
        console.log(error);
        return apiResponse(res, "ERR", error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const followProfile = async (req, res) => {
    try {
        const { profileId } = req.params;

        // Check if already following
        const profile = await Profile.findById(profileId);
        const isFollowing = profile.followers.some(follower => follower.follower_id.equals(req.user.id));

        if (isFollowing) {
            // If already following, unfollow
            await Profile.findByIdAndUpdate(profileId, {
                $pull: { followers: { follower_id: req.user.id } }
            });
            return apiResponse(res, "SUC", "Unfollowed profile successfully", StatusCodes.OK);
        } else {
            // If not following, follow
            await Profile.findByIdAndUpdate(profileId, {
                $push: { followers: { follower_id: req.user.id } }
            });
            return apiResponse(res, "SUC", "Followed profile successfully", StatusCodes.OK);
        }
    } catch (error) {
        console.log(error);
        return apiResponse(res, "ERR", error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};




export {profileEdit,deleteProfile,searchProfile,visitProfile,followProfile}

