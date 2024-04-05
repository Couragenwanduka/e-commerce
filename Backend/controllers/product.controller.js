import { saveProduct } from '../services/product.service.js';
import { validateProduct } from '../config/joi.js';
import cloudinary from '../config/cloudinary.js';
import { multipleUpload } from '../config/multer.js'; 

export const createProduct = async (req, res) => {
    try {
        multipleUpload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({ message: "Error uploading image", error: error });
            }

            const { category, name, description, stock, price } = req.body;
            if (!req.files || req.files.length === 0) { // Change to check for files array
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

            const product = await saveProduct(category, name, description, stock, price, images);
            console.log(product);
            return res.status(200).json({ message: "Product saved successfully", product });
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving product", error: error.name });
    }
};
