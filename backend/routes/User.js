import express from "express";
const router=express.Router();
import { UpdateProfile, GetProfile} from "../controllers/User.js";
import  Auth  from "../middlewares/Auth.js";


router.post("/profile",Auth,UpdateProfile);
router.get("/gt-profile/:id",Auth,GetProfile);

export default router;