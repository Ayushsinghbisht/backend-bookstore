
import users from "../Models/UserModel.js"
import bodyParser from "body-parser"
import bcrypt  from "bcrypt"

import jwt from "jsonwebtoken"

export const signup=async (req,res)=>{
    try{
        console.log(req.body)
        let {fullname,email,password,address}=req.body
        const user=await users.findOne({email})
        
        if(user){
            return res.status(400).json({message:`already exists ${user.email}`})
        }

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,async(error,hashpassword)=>{
                 const User=   await users.create({"fullname":fullname,"email":email,"password":hashpassword,"address":address})
            return res.status(200).json({message:`${User} created`})
                })
            })
            
    }catch(Err){
        console.log(Err)
    }


}



export const login=async(req,res)=>{

    try{
        
        let {email,password}=req.body
       
        const user=await users.findOne({email})
       console.log(user)
         bcrypt.compare(password,user.password,(err,result)=>{
            console.log(result)
            if(!result || !user ){
                console.log("user not exits")
                return res.status(400).json("user not exist")
            }

            const authclaims=[
                {
                    name:user.email
                }
                ,{
                    role:user.role
                }
            ]
            const token=jwt.sign({authclaims},"BookStore",{expiresIn:"1d"})

           

            return res.status(200).json({message:"succesfull",
                user:{
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                    role:user.role,
                    token:token
                }
        })
        })


    }catch(error){
        console.log(error)
        return res.status(400).json({message: `${error}`})
    }

}


export const userinfo=async(req,res)=>{
    
    try{
       
        const {id}=req.headers
        
        const data=await users.findById(id).select("-password")
        
        return res.status(200).json(data)

    }catch(err){
        
        res.status(500).json("server error")
    }
}


export const updateaddress=async(req,res)=>{
    try{

        const {id}=req.headers
        
        const {address}=req.body;
      
     const updateduser=   await users.findByIdAndUpdate(id,{address: address });
       
        return res.status(200).json({status:"done",message:"address updated"})

    }catch(err){
        res.status(500).json("server error")
    }
}