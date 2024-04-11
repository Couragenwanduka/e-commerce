import { saveCart ,getCartProducts,deleteCart,findCartById } from "../services/cart.service.js";
import {verifyCookie} from '../helper/jwt.decode.js';
import {findProductById} from '../services/product.service.js'
import { findUserById} from '../services/user.service.js';  

export const addToCart = async (req, res) => {
    try {
       const token = req.cookies.token;
       const { productId,quantity,price,imageUrl,name} = req.body;
       const decoded = verifyCookie(token);
       if(!decoded){
        return res.status(401).json({message:"Please login"})
       }
       const Product = await findProductById( productId);
       if(!Product){
        console.log("product")
        return res.status(400).json({message:"Product not found"})
       }

        const User = await findUserById(decoded.user.email);
        if(!User){
            return res.status(400).json({message:"User not found"})
        }
        const user=User._id
        const product= Product._id;
       const savedProduct = await saveCart(product,user,quantity,price,imageUrl,name)
       return res.status(200).json({message:"Product saved}",savedProduct:savedProduct})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCart = async(req, res) =>{
      try{
      const token = req.cookies.token;
      const decoded = verifyCookie(token);
      if(!decoded){
        return res.status(401).json({message:"Please login"})
      }
      const user = decoded.user;
      const cart = await getCartProducts(user);
      if(!cart){
        return res.status(400).json({message:"Cart not found"})
      }
      return res.status(200).json({message:"Cart retrieved",cart:cart})
      }catch(error){
        res.status(500).json({message:"Error retrieving cart",error:error})
      }
}

export const deleteCartItem = async(req, res) =>{
  try{
      const {_id}= req.params
      console.log(_id)
      const vaild= await findCartById(_id)
      if(!vaild){
        return res.status(400).json({message:"Cart not found"})
      }
      const deletedCart= await deleteCart(_id)
      return res.status(200).json({message:"product deleted successfully",deletedCart:deletedCart})
  }catch(error){
    res.status(500).json({message:"Error deleting cart",error:error})
  }
}