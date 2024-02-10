import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type:String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profession:{
        type:String
    },
    profile_picture:{
        type: String
    },
    ratings:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{ 
                type:mongoose.Schema.ObjectId,
                ref: "User",
                required: true,  
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String
            }
        }
    ],
    visits: [{
        visitor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        visited_at: {
            type: Date,
            default: Date.now
        }
    }],
    followers: [{
        follower_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }]

})

const Profile = mongoose.model("Profile",profileSchema)

export {Profile} 