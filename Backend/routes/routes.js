import { Router } from "express";
import {registerUser,loginUser} from '../controllers/user.controller.js';
import {createProduct} from '../controllers/product.controller.js';
import {validateEmail,validateOtp,registerSeller} from '../controllers/seller.controller.js'

const router= Router();

router.post('/register',registerUser);

router.post('/login',loginUser);
 
router.post('/uploadProducts',createProduct)

router.post('/validateEmail',validateEmail)

router.post('/validateOtp',validateOtp)

router.post('/registerSeller',registerSeller)

export default router;