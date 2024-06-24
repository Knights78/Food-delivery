import express from "express"
import cors from "cors"
import  connectDB  from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

const app=express()
const port=4000

//middleware

app.use(express.json())
app.use(cors())//using these we can acces backend from the frontend

//db connection
connectDB();

app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))//any request in the /images path is there uploads directly is used through which we can easily acess the images 

// When a request is made to /images/somefile.jpg, the middleware will look for a file named somefile.jpg in the "uploads" directory.
// If the file is found, it will be served to the client.
// If the file is not found, a 404 error will be returned.


app.get("/",(req,res)=>{
    res.send("WORKING API")

})

app.listen(port,()=>{
    console.log(`PORT RUNNING AT http://localhost:${port} `)
})
