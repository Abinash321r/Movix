
import express from 'express';
import getSignUpData from '../Controllers/userSignUp.js';
import getLoginData from '../Controllers/userLogin.js';
import upload from "../config/cloudinary.js"
import getCookieStatus from '../Controllers/userCookie.js';
import getLogoutStatus from '../Controllers/userLogout.js';
import {isAuthenticated} from '../Middlewares/Authentication.js'

const router = express.Router();
router.post('/signupdata', upload.single("profilePic"),getSignUpData);
router.post('/logindata', getLoginData);
router.post('/logout', getLogoutStatus);
router.get('/checkcookie',isAuthenticated,getCookieStatus);

router.get('/',(req,res)=>{
   console.log(req.cookies.usertoken)
  res.end('<h1>hello from server</h1>')
})




export default router;