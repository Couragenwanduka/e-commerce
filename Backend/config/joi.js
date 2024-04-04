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