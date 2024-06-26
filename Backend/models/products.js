import mongoose from 'mongoose';
import Seller from './seller.js';

const ProductSchema= new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
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
   seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Seller',
    required:true
   }
});

const Product=mongoose.model('Product',ProductSchema);

export default Product;