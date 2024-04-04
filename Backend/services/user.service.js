import User from '../models/user.js';
import { hashPassword } from '../config/bcrypt.js';

export const findUserByEmail =async(email)=>{
    try{
        const user = await User.findOne({email});
        return user;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the user"+ error)
    }
}

export const saveUser = async(name,email,password,role)=>{
    try{
        const hashedPassword = await hashPassword(password);
        const user = new User({name,email,password:hashedPassword,role});
        await user.save();
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while saving the user"+ error)
    }
}
export const findAllUsers = async()=>{
    try{
        const users = await User.find();
        return users;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the users"+ error)
    }
}