import bcrypt from 'bcryptjs';

export const hashPassword =async(password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch(error){
        throw new Error("error hashing password"+error.message);
    }
}

export const comparePassword = async(password,user)=>{
    try{
       const isMatch = await bcrypt.compare(password,user.password);
       return isMatch;
    }catch(error){
        throw new Error("error comparing password"+error.message);
    }
}