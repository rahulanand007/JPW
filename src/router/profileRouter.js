import { deleteProfile, followProfile, profileEdit, searchProfile, visitProfile } from "../controller/profileController.js";
import { isAuthenticated } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import express from "express"

const router = express.Router()

router.post("/edit",isAuthenticated,upload.single("profile_picture"),profileEdit)
router.delete("/delete",isAuthenticated,deleteProfile)
router.get("/search",isAuthenticated,searchProfile)
router.post("/visitProfile",isAuthenticated,visitProfile)
router.post("/followProfile",isAuthenticated,followProfile)

export {router}