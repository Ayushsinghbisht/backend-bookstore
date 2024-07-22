import jwt from "jsonwebtoken"

export const authenticationToken=(req,res,next)=>{
    
    const authheader=req.headers["authorization"]
    // console.log("authheader",authheader)

   
    const token=authheader && authheader.split(' ')[1]
// console.log("token",token)
    if(token==null){
        console.log("token is null")
        return res.status(401).json({message:"Token is not provided"})
    }

    jwt.verify(token,"BookStore",(err,user)=>{
        if(err){ 
            console.log("error came")
            return res.status(403).json(err) }
        req.user=user
        // console.log("next")
        next()
    })


}
