import { Router } from "express";
import {
    registerUser,
    loginUser,
    getAllUsers,
    deleteAUserById,
    getUser
} from '../controllers/user.controller.js';

import {
    createProduct,
    getAllProducts,
    deleteProduct,
    searchProduct
} from '../controllers/product.controller.js';

import {
    validateEmail,
    validateOtp,
    registerSeller,
    getAllUsersController,
    deleteSellerController
} from '../controllers/seller.controller.js';

import {
    addToCart,
    getCart,
    deleteCartItem
} from '../controllers/cart.controller.js';

import {
    createOrder,
    getOrderById
}from '../controllers/order.controller.js';

import { verifyCookie } from '../middlewares/jwt.js';

const router = Router();

// User routes
router.get('/getAllProducts', getAllProducts);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getallusers', verifyCookie, getAllUsers);
router.delete('/deleteUser/:_id', verifyCookie, deleteAUserById);
router.get('/getUserInfo', getUser);

// Product routes
router.post('/uploadProducts', createProduct);
router.delete('/deleteProduct/:_id', verifyCookie, deleteProduct);
router.post('/searchProducts', searchProduct);

// Seller routes
router.post('/validateEmail', validateEmail);
router.post('/validateOtp', validateOtp);
router.post('/registerSeller', registerSeller);
router.get('/getallsellers', verifyCookie, getAllUsersController);
router.delete('/deleteseller/:_id', verifyCookie, deleteSellerController);

// Cart routes
router.post('/addtocart', addToCart);
router.get('/showorder', getCart);
router.delete('/deleteorder/:_id',deleteCartItem)

// Order routes
router.post('/saveorder', createOrder);
router.get('/showorderdetails', getOrderById)

export default router;
