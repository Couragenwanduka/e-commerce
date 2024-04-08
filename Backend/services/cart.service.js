import Cart from '../models/cart.js';

export const saveCart = async (product,user,quantity,price,imageUrl) => {
    try {
        const newCart = new Cart({product,user,quantity,price,imageUrl });
        const savedCart = await newCart.save();
        return savedCart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while saving the cart: " + error.message);
    }
}
export const getCartProducts = async (user)=>{
    try {
        const cart = await Cart.findOne({user});
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while retrieving the cart"+ error)
    }
}