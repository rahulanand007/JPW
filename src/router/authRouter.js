import { Router } from "express";
import { googleClient } from "../config/googleConfig.js";
import passport from "passport";
import { loginSuccess } from "../controller/auth.js";
import { constants } from "../utils/constant.js";

const router = Router()

router.get("/login/success", loginSuccess);

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:googleClient.clientUrl,
    failureRedirect:"auth/login/failed"
}))

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        status:"ERR",
        message:"Log in failure"
    })
})

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(constants.frontend_url);
});

export {router}