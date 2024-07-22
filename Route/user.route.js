import express from "express"
import { login, signup, updateaddress, userinfo  } from "../controller/user.controller.js" 
import { authenticationToken } from "../controller/UserAuth.controller.js"
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/getuserinfo",authenticationToken,userinfo)
router.put("/updateAddress",authenticationToken,updateaddress)




export default router