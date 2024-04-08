import { Router } from "express";
import {registerUser,loginUser} from '../controllers/user.controller.js';
import {createProduct,getAllProducts } from '../controllers/product.controller.js';
import {validateEmail,validateOtp,registerSeller} from '../controllers/seller.controller.js'
import {addToCart,getCart } from '../controllers/cart.controller.js';

const router= Router();

router.get('/getAllProducts',getAllProducts)

router.post('/register',registerUser);

router.post('/login',loginUser);
 
router.post('/uploadProducts',createProduct)

router.post('/validateEmail',validateEmail)

router.post('/validateOtp',validateOtp)

router.post('/registerSeller',registerSeller)

router.post('/addtocart',addToCart)

router.get('/showorder',getCart)

export default router;