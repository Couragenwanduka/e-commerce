import {findUserByEmail,saveUser,findAllUsers,findAllAdmins,getUserById,deleteUserById} from '../services/user.service.js';
import {findSellerByEmail} from '../services/seller.service.js';
import {validateSignUp,validateSignIn} from '../config/joi.js';
import { comparePassword } from '../config/bcrypt.js';
import {sendWelcomeMail} from '../config/nodemailer.js';
import jwt from 'jsonwebtoken'
import {verifyCookie} from '../helper/jwt.decode.js'



export const registerUser = async(req,res) =>{
    try{
        const {name,email,password}=req.body;
    const valid= validateSignUp(name,email,password)
    if(!valid){
        return res.status(400).json({message:"Invalid username or password"+valid.message.error})
    }
    const user= await findUserByEmail(email)
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    let role= "user"
    const adminRegex=/^[^@\s]+@(?:[^.@\s]+\.)?courage\.com$/
    if(adminRegex.test(email)){
     const findAllAdmin= await findAllAdmins();
    if(findAllAdmin.length >= 3){
        
        return res.status(400).json({message:"There can't be more three admins"})
    }else{ role = "admin"
     await saveUser(name,email,password,role)
    }}
    const newUser= await saveUser(name,email,password,role)
    sendWelcomeMail(email,name)
    res.status(201).json({message:"User created successfully",newUser})
    }catch(error){
    res.status(500).json({message:error.message})
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const valid = validateSignIn(email, password);
        
        if (!valid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        
        const user = await findUserByEmail(email);
        const seller = await findSellerByEmail(email);
          const role= "seller&user";
        if(user && seller) {
           const isUserMatch= await comparePassword(password,user)
           const isSellerMatch= await comparePassword(password,seller)
           if(isUserMatch || isSellerMatch){
            const payload = { user };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: "user logged in successfully",role ,user, token });
           }
        }else if (user) {
            const isMatch = await comparePassword(password, user);
            const role='user';
            if (isMatch) {
                const payload = { user };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ message: "User logged in successfully", role,user, token });
            }
        } else if (seller) {
            const isMatch = await comparePassword(password, seller);
            const role='seller';
            if (isMatch) {
                const payload = { seller };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ message: "Seller logged in successfully", role,seller, token });
            }
        }
        
        res.status(400).json({ message: "User does not exist. Please sign up." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


export const getAllUsers = async(req, res) =>{
    try{
     const users = await findAllUsers();
     return res.status(200).json({ users });
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteAUserById= async(req, res) =>{
    try{
    const {id}=req.params;
    const user= await getUserById(id);
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }
    await deleteUserById(id)
    return res.status(200).json({message:"User deleted successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getUser= async(req, res) =>{
    try{
    const {token}= req.cookies;
    if(!token){
     return res.status(401).json({message:"please login"})
    }
   const decode = verifyCookie(token);
   if(!decode){
    return res.status(401).json({message:"Could not verify token"})
   }
   const {_id}=decode.user
    const user= await getUserById(_id);
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }
    return res.status(200).json({user})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}