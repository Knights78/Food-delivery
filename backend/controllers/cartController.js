import userModel from "../models/UserModel.js"


const addtoCart=async (req,res)=>{
   
   //note cartData is a object
    try {
        const userdata=await userModel.findOne({_id:req.body.userId});//through this we will get the userdata of a particular id
        
       // console.log(userdata)
        const cartData=await userdata.cartData
       // console.log(cartData)
        //console.log(req.body.itemId)
        if(!cartData[req.body.itemId])
            {
                cartData[req.body.itemId]=1
            }
            else{
                cartData[req.body.itemId]+=1   
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"added to cart succesfully"})
    } catch (error) {
        console.log("Error occured in cart controller.js")
        res.json({success:false,message:"error in add to cart"})
    }
    
}
const getCartItem=async(req,res)=>{
   try {
     let userdata=await userModel.findById(req.body.userId)
     let cartData=await userdata.cartData
     res.json({success:true,cartData})
     
   } catch (error) {
    console.log("error occured in get list")
    res.json({success:false,message:"error occured"})
   }
}

const removefromCart=async (req,res)=>{
    try {
        let userdata=await userModel.findById(req.body.userId)
       // console.log(userdata)
        let cartData=await userdata.cartData
       // console.log(cartData)
        if(cartData[req.body.itemId]>0)//if that item is present or not we are checking that
        {
            cartData[req.body.itemId]=cartData[req.body.itemId]-1;
        }
       await userModel.findByIdAndUpdate(req.body.userId,{cartData})
       //console.log(cartData)
       res.json({success:true,message:"removed from cart"})
       

    } catch (error) {
        res.json({success:false, message:"error in removinf from the cart"
        })
    } 
}

export {addtoCart,getCartItem,removefromCart}