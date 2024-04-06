import Seller from '../models/seller.js';
import { hashPassword } from '../config/bcrypt.js';

export const saveSeller = async (name, email, password, companyName, companyAddress) => {
    try {
        const hashedPassword = await hashPassword(password)
        const newSeller = new Seller({ name, email, password:hashedPassword, companyName, companyAddress });
        const savedSeller = await newSeller.save();
        return savedSeller;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while saving the seller: " + error.message);
    }
};

export const findSellerByEmail = async(email)=>{
    try{
        const seller = await Seller.findOne({email});
        return seller;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the seller"+ error)
    }
}
