import express from "express"
import {Login,Register,Details} from '../controllers/UserController.js'
import authMiddleware from "../middleware/auth.js"
const userRouter=express.Router()

userRouter.post('/register',Register)
userRouter.post('/login',Login)
userRouter.get('/details',authMiddleware,Details)



export default userRouter