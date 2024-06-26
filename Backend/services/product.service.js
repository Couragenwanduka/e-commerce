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

export const findAllProducts = async()=>{
    try{
        const products = await Product.find();
        return products;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the products"+ error)
    }
}

export const findProductById = async(_id)=>{
    try{
        const product = await Product.findById({_id});
        return product;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the product"+ error)
    }
}

export const deleteProductById = async(_id)=>{
    try{
        const product = await Product.findByIdAndDelete({_id});
        return product;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while deleting the product"+ error)
    }
}

export const findProductsByName= async(_name)=>{
    try{
        const products = await Product.find({name:{$regex:_name}});
        return products;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the products"+ error)
    }
}

export const findAndUpdateProduct=async(_id,stock)=>{
       try{
           const result= await Product.findByIdAndUpdate(_id,{stock: stock},{new: true})
           return result;
       }catch(error){
        console.log(error);
        throw new Error("An error occurred while updating the product"+ error)
       }
}