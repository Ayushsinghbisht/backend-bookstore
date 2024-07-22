import mongoose, { mongo } from "mongoose";


const userSchema= new mongoose.Schema({
fullname:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
address:{
    type:String,
    required:true
},
avatar:{
    type:String,
   default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL95BbJqNhfe6K9_7cQPbC41EURBRnw0oZug&s"
    
},
role:{
    type:String,
    default:"user",
    enum:["user","admin"]
},
favourites:[
    {
        type:mongoose.Types.ObjectId,
        ref:"books"
    }
],
cart:[
    {
        type:mongoose.Types.ObjectId,
        ref:"books"
    }
],
order:[
    {
        type:mongoose.Types.ObjectId,
        ref:"orders"
    }
]


},{timestamps:true})

const users=mongoose.model('users',userSchema)
export default users