import foodModel from "../models/foodModel.js";
import fs from "fs"

const addFood=async (req,res)=>{

    let image_filename=`${req.file.filename}`//we are storing the uploaded file name in the variable
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added"})
    } catch (error) {
        console.log("Error occured in food controller.js")
        res.json({success:false,message:"error"})
    }
    
}
const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({})
       res.json({success:true,data:foods})

    } catch (error) {
        res.json({success:false,
            message:"error"
        })
    } 
}

const removeFood=async (req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})//this method will remove the image from the uploads folder
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
}

export {addFood,listFood,removeFood}