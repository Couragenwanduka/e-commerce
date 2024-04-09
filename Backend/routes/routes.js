import { Router } from "express";
import {registerUser,loginUser,getAllUsers,deleteAUserById } from '../controllers/user.controller.js';
import {createProduct,getAllProducts,deleteProduct } from '../controllers/product.controller.js';
import {validateEmail,validateOtp,registerSeller,getAllUsersController,deleteSellerController} from '../controllers/seller.controller.js'
import {addToCart,getCart } from '../controllers/cart.controller.js';
import {verifyCookie} from '../middlewares/jwt.js'

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

router.get('/getallusers',verifyCookie,getAllUsers )

router.get('/getallsellers',verifyCookie,getAllUsersController)

router.delete('/deleteseller/:_id',verifyCookie,deleteSellerController)

router.delete('/deleteUser/:_id',verifyCookie,deleteAUserById)

router.delete('/deleteProduct/:_id',deleteProduct)
export default router;