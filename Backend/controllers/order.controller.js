import { saveOrder,findOrderById } from "../services/order.service.js";
import {verifyCookie} from '../helper/jwt.decode.js'
import{validateOrder} from '../config/joi.js'
import {sendOrderAcknowledgementMail} from '../config/nodemailer.js'
import {alertSeller,getProduct } from '../helper/orderLogic.js';


export const createOrder = async (req, res) => {
    try{
        const token = req.cookies.token;
        const {name,email,phonenumber,address,city,country,paymentMethod}=req.body.formData;
        const {products,totalPrice}=req.body;
        const decoded = verifyCookie(token);
        if(!decoded){
            return res.status(401).json({message:"Please login"})
        }
        const valid= validateOrder(name,email,phonenumber,address,city,country,paymentMethod)
        if(!valid){
            return res.status(400).json({message:"Invalid username or password"+valid.message.error})
        }
        const user= decoded.user
        const order= await saveOrder(name,email,phonenumber,address,city,country,paymentMethod,products,totalPrice,user)
        if (!order) {
            return res.status(500).json({ message: "Failed to create order" });
        }
        const sendUserMail=   await sendOrderAcknowledgementMail(decoded.user.email, decoded.user.name)
        const sendSellerMail = await alertSeller(products)
       
        res.status(201).json({message:"Order created successfully"})

    }catch(error){
        res.status(500).json({message:"An error occured",error:error.message})
    }
}

export const getOrderById = async (req, res) => {
    try{
        const token = req.cookies.token;
        const decoded = verifyCookie(token);
        if(!decoded){
            return res.status(401).json({message:"Please login"})
        }
        const user=decoded.user._id;
        const order= await findOrderById(user)
        if(!order){
            return res.status(400).json({message:"Order not found"})
        }
        const product= await getProduct(order) 
        res.status(200).json({message:"Order retrieved successfully",product})
    }catch(error){
        res.status(500).json({message:"An error occured",error:error.message})
    }
}