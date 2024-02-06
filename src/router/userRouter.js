import { Router } from "express";
import { register } from "../controller/user.js";

const router = Router()


router.post('/register',register)

export {router}