import {saveSeller,findSellerByEmail} from '../services/seller.service.js';
import {generateOtp} from '../helper/otps.js';
import {sendMail} from '../config/nodemailer.js'
import jwt from 'jsonwebtoken';
import {validateSellerSchema} from '../config/joi.js'

export const validateEmail = async(req,res) =>{
       try{
        const {email}=req.body;
        const user= await findSellerByEmail(email)
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const otp= generateOtp();
        await sendMail(otp,email);
        const payload={otp}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'20m'})
        res.cookie("token",token)
        return res.status(200).json({message:"Otp sent successfully"});
       }catch(error){

       }
}

export const validateOtp= async(req,res)=>{
    try{
       const {otp}=req.body;
       const token= req.cookies.token;
       const payload= jwt.verify(token,process.env.JWT_SECRET);
       const currentTime= Math.floor(Date.now()/1000)
      if((payload.exp < currentTime)){
      return res.status(401).json({message:"Token has expired"})
       }
       if(otp !== payload.otp){
        return res.status(400).json({message:"Invalid otp"})
       }
       return res.status(200).json({message:"OTP verified successfully"})
    }catch(error){
        return res.status(400).json({message:"error validating otp"})
    }
}

export const registerSeller= async (req, res) => {
    try{
       const {name, email, password, companyName, companyAddress} = req.body
        const vaild= validateSellerSchema(name, email, password, companyName, companyAddress)
        if(!vaild){
            return res.status(400).json({message:"Invalid username or password"+vaild.message.error})
        }
         await saveSeller(name, email, password, companyName, companyAddress)
        return res.status(200).json({message:"User registered successfully"})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}