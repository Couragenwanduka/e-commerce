import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
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
    companyName:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    }

});

const Seller=mongoose.model('Seller',sellerSchema);