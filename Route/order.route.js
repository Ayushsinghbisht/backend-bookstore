import { authenticationToken } from "../controller/UserAuth.controller.js";
import express from "express"
import { orders } from "../Models/orderModel.js";
import users from "../Models/UserModel.js";


const router=express.Router()


router.post("/place",authenticationToken,async(req,res)=>{
    try{
        

        const {id}=req.headers
        const {order}=req.body
    
        for(const orderdata of order)
        {
            
            const neworder=new orders({user:id,book:orderdata._id})
            const orderdatafromdb=await neworder.save();
            // const orderdatafromdb=await orders.create({user:id,book:orderdata._id})
            console.log("orderdatafromdb",orderdatafromdb)  
            
            await users.findByIdAndUpdate(id,{$push:{order:orderdatafromdb._id}})

            await users.findByIdAndUpdate(id,{$pull:{cart:orderdata._id}})
        }
       
        return res.json({
            status:"sucess",
            message:"order_placed"
        })

    }catch(err)
    {
        console.log("th errpr in placccing order",err)

    }
})

router.get("/get",authenticationToken,async(req,res)=>{
   
    try{
        const {id}=req.headers
        const userData=await users.findById(id).populate({
            path:"order",
            populate:{path:"book"}
        })

        const orderdata=userData.order.reverse()


       
        return res.json({
            status:"sucess",
            data:orderdata
        })


        

    }catch(err){
        console.log("the errror is this",err)
    }
})



router.get("/getallorder",authenticationToken,async(req,res)=>{
    
    try{
        const {id}=req.headers
        const userData=await orders.find().populate({
            path:"book",
            
        }).populate({path:"user"}).sort({createdAt:-1})

        

        // console.log(userData)
       
        return res.json({
            status:"sucess",
            message:"order placed",
            data:userData
        })




    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error"})
    }
})


router.put("/update/:id",authenticationToken,async(req,res)=>{
    try{    
        const {id}=req.params
        await orders.findByIdAndUpdate(id,{status:req.body.status})

        return res.json({
            status:"sucess",
            message:"updated status"
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({message:"an error occured"})
    }
})





export default router