import mongoose from 'mongoose';

const UserShema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
       type:String,
       required:true,
       enum:['admin', 'user'],
       default:'user'
    }
})

const User=mongoose.model('User',UserShema);

export default User;