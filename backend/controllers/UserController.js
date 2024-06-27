import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import userModel from "../models/UserModel.js"


//{ id } is the payload of the token. The payload is the data that you want to store in the token. In this case, it is an object containing the id.
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.json({ success: false, message: "No such user exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Wrong password" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.error('Error in login:', error);
        return res.json({ success: false, message: "An error occurred" });
    }
}

const Register=async(req,res)=>{
   const {name,email,password}=req.body
   try {
    const exists=await userModel.findOne({ email: email })//if the email provided by the user 
    if(exists)
     {
         return res.json({sucess:false,message:"user already exists"})
     }
     //validating the email
     if(!validator.isEmail(email) )//it will check whether it is a valid email or not 
     {
         return res.json({sucess:false,message:"enter valid email"})
     }
     if(password.length < 8)
      {
             return res.json({sucess:false,message:"please enter strong password"})
     }
     //hashing user password
     const salt=await bcrypt.genSalt(10)
     const hashedpassword=await bcrypt.hash(password,salt);
 
     const newUser=new userModel({
         name:name,
         email:email,
         password:hashedpassword
     });
 
     const user=await newUser.save()
     const token=createToken(user._id)
     res.json({success:true,token})
   } catch (error) {
    res.json({sucess:false,message:"error occured"})
   }
  

}

const Details=async(req,res)=>{
    try {
        let userdata=await userModel.findOne({_id:req.body.userId})
        console.log(userdata)
        res.json({success:true,data:userdata.name})
    } catch (error) {
       console.log(error)
       res.json({success:false,message:"error occured"})   
    }
}


export {Login,Register,Details} 