import { Router } from "express";
import {registerUser,loginUser} from '../controllers/user.controller.js';
import {createProduct} from '../controllers/product.controller.js';

const router= Router();

router.post('/register',registerUser);

router.post('/login',loginUser);
 
router.post('/uploadProducts',createProduct)

export default router;