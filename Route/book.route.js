import express from 'express'
const router=express.Router()
;
import { getBooks } from '../controller/Book.controller.js'
import {getBookById} from '../controller/Book.controller.js'
import { allbook, getbooks } from '../controller/Book.controller.js'
import { authenticationToken } from '../controller/UserAuth.controller.js';
import books from '../Models/BookstoreModel.js';
import users from '../Models/UserModel.js';
router.post('/addbook',authenticationToken,getbooks);
router.get('/allbook',allbook);

router.get('/getbookbyid/:id', getBookById)


router.get('/',getBooks);


router.delete('/deletebook',authenticationToken,async(req,res)=>{

try{
    const {bookid}=req.headers
    await books.findByIdAndDelete(bookid)

    return res.status(200).json({
        message:"deleted succesfully"
    })

}catch(err){
    console.log(err)
}

})

router.post('/updatebook',authenticationToken,async(req,res)=>{

    try{
        
        const {bookid}=req.headers

        const {name,
            title,
            price,
            category,
            image}  =req.body

            // console.log("name",name,"title",title,"price",price,"category",category,"image",image)
    
        const book=await books.findByIdAndUpdate(bookid,{price:price,
            name:name,
            category:category,
            title:title,
            image:image

        })
            
   

return res.status(200).json({
    message:"updated succesfully"
})

    }catch(err){
        console.log(err)
      
    }
   


})



router.get('/del',async(req,res)=>{
    console.log("req to backend")
    const data=await users.deleteMany()

    res.json({data:"delted"})
})


export default router
