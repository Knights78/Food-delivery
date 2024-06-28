import express from "express"
import { placeOrder,verifyOrder,userOrder,listOrders,updateStatus} from "../controllers/orderController.js"

import authMiddleware from "../middleware/auth.js"

const orderRouter=express.Router()

orderRouter.post('/placeorder',authMiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorder',authMiddleware,userOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

export default orderRouter