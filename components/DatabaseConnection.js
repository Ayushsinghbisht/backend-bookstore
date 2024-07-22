
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
configDotenv()

export const DatabaseConnection = async() => {

const mongodburi=process.env.MONGODB_URI
console.log(process.env.MONGODB_URI)
    try{

        await mongoose.connect(mongodburi)
        console.log("connected to mongo db")
    }catch(err){
        console.log("err",err)

    }

 
}
