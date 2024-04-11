import{ findProductById,findAndUpdateProduct} from '../services/product.service.js'
import {findSellerById} from '../services/seller.service.js'
import {sendSoldProductMail }from '../config/nodemailer.js'
import {findCartById} from '../services/cart.service.js'


export const  alertSeller= async(products) =>{
    try{
        for (const product of products) {
            const result = await findProductById(product.product);
            if(result.seller){
                const seller = await findSellerById(result.seller);
                if(!seller){
                    throw new Error("An error occurred while retrieving the seller"+ seller)
                }
                const quantity = product.quantity || 1;
                const newQuantity = result.stock - quantity;
                await findAndUpdateProduct(result._id, newQuantity.toString());
                if(!findAndUpdateProduct){
                    throw new Error("An error occurred while retrieving the product"+ findAndUpdateProduct)
                }
                await sendSoldProductMail(seller.email, product._id, product.name, seller.name);
            }
           
        }
    }catch( error){
        console.log(error);
        throw new Error("An error occurred while retrieving the product"+ error)
    }
}



export const getProduct = async (orders) => {
    try {
        const products = [];
        for (const order of orders) {
            const orderProducts = order.products; // Access the products array within the order
            for (const productId of orderProducts) {
                const product = await findCartById(productId);
                const product_Id=product.product;
                const result = await findProductById(product_Id);
                products.push(result);

            }
        }
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("An error occurred while retrieving the products: " + error);
    }
}


