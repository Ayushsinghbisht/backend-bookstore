import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
            type:mongoose.Types.ObjectId,
            ref:"users"
        },
    book: {
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        default:'order placed',
        enum:["order placed","out for delivery","order delivered","cancel"]
    },
    

},{timestamps:true})

export const orders=mongoose.model("orders",orderSchema)