import books from "../Models/BookstoreModel.js";
import users from "../Models/UserModel.js";

export const getBooks=async(req,res)=>{

    try{
        const book=await books.find()
        res.status(200).json(book)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}


export const getbooks=async(req,res)=>{

    try{
        const {id}=req.headers
       const user= await users.findById(id);
        if(user.role!=="admin")
        {
            return res.status(400).json("no acess")
        }
        const book=await books.create({
            name:req.body.name,
            title:req.body.title,
            price:req.body.price,
            category:req.body.category,
            image:req.body.image,


        })
        console.log("added")
        res.status(200).json(book)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }


}

export const allbook=async(req,res)=>{
   try{

    const allbook=await books.find().sort({createdat:-1})

   }catch(err){
    return res.status(500).json(err)
   }
}

export const getBookById=async(req,res)=>{
    try{
       
        const {id}=req.params;
        const book=await books.findById(id)
        return res.json({
            status:"success",
            data:book
        })
    }catch(err){
        console.log(err)
    }
}