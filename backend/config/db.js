import mongoose from "mongoose"
  const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://saifushaikh102:84510@cluster0.a3ooqhc.mongodb.net/food-del').then(()=>console.log("database connected"))
}

export default connectDB;