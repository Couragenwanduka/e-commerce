import jwt from 'jsonwebtoken';

export const verifyCookie= async(req,res,next)=>{
  const token = req.cookies.token
  if(!token){
   return res.status(401).json({message:"Please login"})

  }try{
   const decode= jwt.verify(token, process.env.JWT_SECRET)
   if(!decode){
    return res.status(401).json({message:"Could not verify token"})
   }
   if(decode.user.role !== 'admin'){
    return res.status(401).json({message:'unauthorized user'})}
    
    const currentTime= Math.floor(Date.now()/1000)
    if(decode.exp < currentTime){
      return res.status(401).json({message:"Token has expired"})
    }
   req.decode= decode
   next()
  }catch(error){
    return res.status(500).json({message:error.message})
  }
}