import { profileEdit } from "../controller/profileController.js";
import { isAuthenticated } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import express from "express"

const router = express.Router()

router.post("/edit",isAuthenticated,upload.single("profile_picture"),profileEdit)

export {router}