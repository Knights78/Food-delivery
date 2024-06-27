import jwt from "jsonwebtoken"
const authMiddleware= async(req,res,next)=>{
   //destructuring the token from the headers
   const {token}=req.headers;

   if(!token)
    {
       return res.json({success:false,message:`not authorized login again ${token}`})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);//token which is been stored will be decoded here
        req.body.userId=token_decode.id;//we are storing it in the body so that we can acces it easily eherever we want
        //console.log(req.body.id)//this is the id of the user which through it has login (id from mongoDb)
        next();
    } catch (error) {
        res.json({success:false,message:"error is there in auth"})
    }
}

export default authMiddleware



// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   // Extract the token from the Authorization header
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized, login again" });
//   }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id; // attach userId to the request body
//     next();
//   } catch (error) {
//     console.error("Error in authMiddleware:", error);
//     res.status(403).json({ success: false, message: "Token is invalid or expired" });
//   }
// };

// export default authMiddleware;


