import express from "express"
import { addtoCart,removefromCart,getCartItem } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"
const cartRouter=express.Router()

cartRouter.post('/add',authMiddleware,addtoCart)
cartRouter.post('/get',authMiddleware,getCartItem)
cartRouter.post('/remove',authMiddleware,removefromCart)

export default cartRouter