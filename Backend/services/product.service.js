import Product from "../models/products.js";

export const saveProduct = async (category,name,description,stock,price,imageUrl,seller) => {
    try{
        const newproduct = new Product({category,name,description,stock,price,imageUrl,seller});
        return newproduct.save();
    }catch(error){
        // console.log(error);
        throw new Error("An error occurred while saving the product")
    }
}