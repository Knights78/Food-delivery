import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe"
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const url='http://localhost:5173'
const placeOrder = async (req, res) => {
    try {
      const { orderData } = req.body;
      const id=req.body.userId;
      //console.log(orderData.items)
      //console.log(id)
      //console.log(orderData)
      const newOrder = new orderModel({
        userId: id,
        address: orderData.address,
        items: orderData.items,
        amount: orderData.amount
      });
     // console.log(userId)
      await newOrder.save();
      await userModel.findByIdAndUpdate( id,{ cartData: {} });


      const line_items = orderData.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100*80
        },
        quantity: item.quantity
      }));
  
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery charges"
          },
          unit_amount: 2*100*80 // Amount should be in cents
        },
        quantity: 1
      });
  
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
      });
      //console.log(session.url)
  
      res.json({ success: true, session_url: session.url });
     
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error in order controller" });
    }
  };


  const verifyOrder=async(req,res)=>{
        const {orderId,success}=req.body;
        //console.log(orderId,success)
        try {
            if(success=='true')
                {
                    await orderModel.findByIdAndUpdate(orderId,{payment:"true"});
                    res.json({success:true,message:"paid"})
                }
                else{
                    await orderModel.findByIdAndDelete(orderId);
                    res.json({success:false,message:" not paid"})  
                }
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"errorrrr"})
        }
        
  }
//to show the user orders we are creating this api
  const userOrder=async(req,res)=>{
   
    try {

      const order=await orderModel.find({userId:req.body.userId})//userId will come from the authmiddleware
      res.json({success:true,data:order})

    } catch (error) {
      console.log("Error in userOrder",error)
      res.json({success:false,message:"eRRRRRRR"})
    }
  }

  //listing orders for admin panel
  const listOrders=async(req,res)=>{
      try {
        const orders=await  orderModel.find({});
        res.json({success:true,data:orders})
      } catch (error) {
        console.log(error) 
      }
  }
  const updateStatus=async(req,res)=>{
    try {
      // const orderId=req.body
      // console.log(orderId)
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"orders status updated"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"orders status errror"})
    }
  }


export { placeOrder,verifyOrder,userOrder,listOrders,updateStatus };
