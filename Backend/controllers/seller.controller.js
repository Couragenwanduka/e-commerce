import {saveSeller,findSellerByEmail,getAllUsers,deleteSeller,findSellerById} from '../services/seller.service.js';
import {generateOtp} from '../helper/otps.js';
import {sendMail} from '../config/nodemailer.js'
import {verifyCookie} from '../helper/jwt.decode.js'
import {comparePassword} from '../config/bcrypt.js'
import {validateSellerSchema,validateSellerLogin} from '../config/joi.js'
import jwt from 'jsonwebtoken'

export const validateEmail = async(req,res) =>{
       try{
        const {email}=req.body;
        const user= await findSellerByEmail(email)
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const otp= generateOtp();
        await sendMail(otp,email);
        const payload={email,otp}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'20m'})
        res.cookie('token',token,{httpOnly:true})
        return res.status(200).json({message:"Otp sent successfully",token:token});
       }catch(error){
        res.status(500).json({message:"Error sending OTP",error:error});   
       }
}

export const validateOtp= async(req,res)=>{
    try{
       const {otp}=req.body;
       const token= req.cookies.token;
       if(!token){
        return res.status(401).json({message:"try again"})
       }
       const payload= verifyCookie(token)
       const currentTime= Math.floor(Date.now()/1000)
      if((payload.exp < currentTime)){
      return res.status(401).json({message:"Token has expired"})
       }
       const otpnumber= parseInt(otp)
       if(otpnumber !== payload.otp){
        return res.status(400).json({message:"Invalid otp"})
       }
       return res.status(200).json({message:"OTP verified successfully"})
    }catch(error){
        return res.status(400).json({message:"error validating otp"})
    }
}

export const registerSeller = async (req, res) => {
    try {
        const token = req.cookies.token;
        const { name, password, companyName, companyAddress } = req.body;

        // Validate schema
        const valid = validateSellerSchema(name, password, companyName, companyAddress);
        if (!valid) {
            return res.status(400).json({ message: "Invalid username or password" + valid.message.error });
        }

        let payload;
        try {
            payload = jwt.verify(token, 'your-secret-key');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expired" });
            } else {
                return res.status(400).json({ message: "Invalid token" });
            }
        }

        // Check if payload contains email
        if (!payload || !payload.email) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const { email } = payload;
        if (!email) {
            return res.status(400).json({ message: "Token has expired" });
        }

        // Save seller
        await saveSeller(name, email, password, companyName, companyAddress);
        
        return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async(req,res) =>{
    try{
     const {email,password} = req.body;
     const valid= validateSellerLogin(email,password)
     if(!valid){
        return res.status(400).json({message:"Invalid username or password"+valid.message.error})
     }
     const user= await findSellerByEmail(email)
     if(!user){
        return res.status(400).json({message:"User does not exist please Sign up"+valid.message.error})
     }
     const isMatch= await comparePassword(password,user)
     if(!isMatch){
        return res.status(400).json({message:"Invalid username or password"+valid.message.error})
     }
     const payload={user}
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
     return res.status(200).json({message:"user successfully login",token:token})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.name });
    }
}

export const deleteSellerController = async (req, res) => {
    try {
        const {_id}=req.params;
        const seller = await findSellerById(_id);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        await deleteSeller(_id);
        return res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting seller", error: error.name });
    }

}