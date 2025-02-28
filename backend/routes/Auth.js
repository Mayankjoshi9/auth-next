import express from 'express';
const router=express.Router();

import { Signup,Login,Me,Logout } from '../controllers/Auth.js';
import Auth from '../middlewares/Auth.js';


router.post("/signup",Signup);
router.post("/login",Login);
router.get("/me",Auth,Me);
router.post("/logout",Auth,Logout);

export default router;