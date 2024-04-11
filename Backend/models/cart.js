import mongoose from 'mongoose';
import User from './user.js';
import Product from './products.js';


const cartSchema= new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
   
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageUrl:[{
        type:String,
        required:true
    }],
    name:{
        type:String,
        required:true
    }

})

const Cart =mongoose.model('Cart',cartSchema);

export default Cart;