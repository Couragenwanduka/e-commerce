import mongoose from 'mongoose';


const orderSchema =({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    products:[{
       type:String,
       required:true
    }],
    totalPrice:{
        type:String,
        required:true
    },
    user:[{
       type:String,
        required:true
    }],
    orderstatus:{
        type:String,
        default:"pending",
        enum:['pending', 'processing', 'delivered']
    }
})

const Order= mongoose.model('Order',orderSchema);

export default Order;