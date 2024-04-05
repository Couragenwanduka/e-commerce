export const generateOtp=()=>{
    const max= 50000000
    const min= 1000000
    const otp=Math.floor(Math.random()*(max + min)-min);
    return otp;
}