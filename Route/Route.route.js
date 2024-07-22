import { authenticationToken } from '../controller/UserAuth.controller.js'
import express from 'express'
import users from '../Models/UserModel.js'

const router=express.Router()


router.put("/addtocart",authenticationToken,async(req,res)=>{
    
    try{

        const {bookid,id}=req.headers
        
        const userData=await users.findById(id)
        
       
   const isbookincart=userData.cart.includes(bookid)
       
        if(isbookincart){
            console.log("in cart already")
            return res.json({
                status:"sucess",
                message:"already there"
            })
        }
        console.log("else")
   const userupdate= await users.findByIdAndUpdate(id,{
            $push:{cart:bookid}
        })
        console.log("updated",userupdate)
        return res.json({
            status:"sucess",
            message:"added"
        })


    }catch(err){
        return res.status(500).json({message:err})

    }
})

router.put("/removecart/:bookId",authenticationToken,async(req,res)=>{

    try{
        const {bookId}=req.params
      
        const {id}=req.headers

        const userData=await users.findById(id)
        
     const isbookincart=userData.cart.includes(bookId)
        if(!isbookincart){
            return res.json({
                status:"sucess",
                message:"not there"
            })
        }

        const cart=await users.findByIdAndUpdate(id,{
            $pull:{cart:bookId}
        })

        
        return res.json({
            status:"sucess",
            message:"removed",
            data:cart
        })


    }catch(err){
        return res.status(500).json({message:err})

    }
})


router.get("/getcart",authenticationToken,async(req,res)=>{
    
    try{
        
        const {id}=req.headers
        const userData=await users.findById(id).populate("cart");
       
        const cart=userData.cart.reverse()
       

        
        return res.json({
            status:"sucess",
            data:cart
        })


    }catch(err){
        return res.status(500).json({message:err})

    }
})


export default router