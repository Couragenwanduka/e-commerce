import { saveProduct,findAllProducts,deleteProductById,findProductById } from '../services/product.service.js';
import { validateProduct } from '../config/joi.js';
import cloudinary from '../config/cloudinary.js';
import { multipleUpload } from '../config/multer.js'; 
import { findSellerByEmail } from '../services/seller.service.js';
import { verifyCookie } from '../helper/jwt.decode.js';
import {sendProductDeleteMail} from '../config/nodemailer.js'

export const createProduct = async (req, res) => {
    try {
        multipleUpload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({ message: "Error uploading image", error: error });
            }
            
            const { category, name, description, stock, price } = req.body;
            const { token } = req.cookies; 
           if(!token) {
            return res.status(400).json({ message: "You need to login " });
           }
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }

            const images = [];
            for (const file of req.files) {
                const uploadImage = await cloudinary.uploader.upload(file.path);
                if (!uploadImage) {
                    return res.status(400).json({ message: "Image upload failed" });
                }
                images.push(uploadImage.secure_url);
            }

            const valid = validateProduct(category, name, description, stock, price, images);
            if (!valid) {
                return res.status(400).json({ message: "Invalid product information", error: valid.message.error });
            }

            const payload = verifyCookie(token);
            if (!payload) {
                return res.status(400).json({ message: "Invalid token" });
            }

            const { email } = payload;
            const user = await findSellerByEmail(email);
            if (!user) {
                return res.status(400).json({ message: "User does not exist. Please sign up." });
            }

            const product = await saveProduct(category, name, description, stock, price, images, user._id);
            console.log(product);
            return res.status(200).json({ message: "Product saved successfully", product });
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving product", error: error.name });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await findAllProducts();
        return res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.name });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const valid = await findProductById(_id);
        if (!valid) {
            return res.status(400).json({ message: "Invalid product id" });
        }
        console.log(valid)
        // const deletedProduct = await deleteProductById(_id);
        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.name });
    }
}