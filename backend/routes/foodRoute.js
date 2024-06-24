import express from "express";
import {addFood, listFood,removeFood} from "../controllers/foodController.js";
import multer from "multer"//for stroing the images information

const foodRouter=express.Router()

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})//now we can store image in the uploads folder

foodRouter.post("/add",upload.single("image"),addFood)//whenever any post request is send on the server in the form image is there with the name field as image as welll we have to upload after that addFood function is ca;lled
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)

export default foodRouter