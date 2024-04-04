import mongoose from 'mongoose'

const connectionDb=async()=>{
    try{
        await mongoose.connect(process.env.mongodb_string)
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(err)
    }
}

export default connectionDb;