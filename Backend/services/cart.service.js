import { modelNames } from 'mongoose';
import Cart from '../models/cart.js';

export const saveCart = async (product,user,quantity,price,imageUrl,name) => {
    try {
        const newCart = new Cart({product,user,quantity,price,imageUrl,name });
        const savedCart = await newCart.save();
        return savedCart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while saving the cart: " + error.message);
    }
}
export const getCartProducts = async (user)=>{
    try {
        const cart = await Cart.find({user});
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while retrieving the cart"+ error)
    }
}

export const deleteCart = async (_id) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(_id);
        return deletedCart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the cart: " + error.message);
    }
}

export const findCartById = async (_id) => {
    try {
        const cart = await Cart.findById(_id);
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while retrieving the cart"+ error)
    }
}