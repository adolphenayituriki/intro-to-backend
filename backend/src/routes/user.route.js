import { Router } from "express";// Route is a tool which help us get route in express 
// express is our framework which basically handles the routes, but router is  a tool which we need to use
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;