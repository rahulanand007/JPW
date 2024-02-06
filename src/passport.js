import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"
import { googleClient } from "./config/googleConfig.js"

passport.use(
    new GoogleStrategy({
        clientID:googleClient.clientID,
        clientSecret:googleClient.clientSecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    function (accessToken, refeshToken, profile, callback){
        callback(null,profile)
    }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

export default passport;