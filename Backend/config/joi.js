import joi from 'joi';

const signUpSchema = joi.object({
  name:joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const productSchema = joi.object({
    category:joi.string().required(),
    name:joi.string().required(),
    description:joi.string().required(),
    stock:joi.number().required(),
    price:joi.number().required(),
    image:joi.string().required()
});

const sellerSchema = joi.object({
    name:joi.string().required(),
    password: joi.string().min(8).required(),
    companyName:joi.string().required(),
    companyAddress:joi.string().required()
});
const sellerLogin= joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
})

const orderSchema= joi.object({
    name:joi.string().required(),
    email: joi.string().email().required(),
    phone:joi.string().required(),
    address:joi.string().required(),
    city:joi.string().required(),
    country:joi.string().required(),
    paymentmethod:joi.string().required()
});

export const validateOrder=(name,email,phone,address,city,country,paymentmethod)=>{
    try{
        const result= orderSchema.validate(name,email,phone,address,city,country,paymentmethod);
        return result;
    }catch(error){
        return error;
    }
}

export const validateSellerLogin=(email,password)=>{
    try{
        const result= sellerLogin.validate(email,password);
        return result;
    }catch(error){
        return error;
    }
}

export const validateSellerSchema =(name,email,password,companyName,companyAddress)=>{
    try{
        const result= sellerSchema.validate(name,email,password,companyName,companyAddress);
        return result;
    }catch(error){
        return error;
    }
}
export const validateSignUp=(name,email,password) => {
    try{
        const result= signUpSchema.validate(name,email,password);
        return result;
    }catch(error){
        return error;
    }
}

export const validateSignIn=(email,password) =>{
    try{
        const result= signInSchema.validate(email,password);
        return result;
    }catch(error){
        return error;
    }
}

export const validateProduct=(category,name,description,stock,price)=>{
    try{
        const result= productSchema.validate(category,name,description,stock,price);
        return result;
    }catch(error){
        return error;
    }
}