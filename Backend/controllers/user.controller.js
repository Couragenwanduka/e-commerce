import {findUserByEmail,saveUser,findAllUsers,findAllAdmins,getUserById,deleteUserById} from '../services/user.service.js'
import {validateSignUp,validateSignIn} from '../config/joi.js'
import { comparePassword } from '../config/bcrypt.js';
import {sendWelcomeMail} from '../config/nodemailer.js'
import jwt from 'jsonwebtoken'


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

export const loginUser = async(req,res) =>{
    try{
    const {email,password}=req.body;
    const valid= validateSignIn(email,password)
    if(!valid){
        return res.status(400).json({message:"Invalid username or password"+valid.message.error})
    }
    const user= await findUserByEmail(email)
    if(!user){
        return res.status(400).json({message:"User does not exist please Sign up"+valid.message.error})
    }
    const isMatch= await comparePassword(password,user)
    if(!isMatch){
        return res.status(400).json({message:"Invalid username or password"+valid.message.error})
    }
    const payload= {user}
    console.log(payload)
    const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '2h'})
    res.cookie('token',token,{httpOnly:true})
    res.status(200).json({message:"User logged in successfully",user,token})
    }catch(error){
    res.status(500).json({message:error.message})
    }
}


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