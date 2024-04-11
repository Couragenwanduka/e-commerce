import Order from '../models/order.js';

export const saveOrder= async(name,email,phonenumber,address,city,country,paymentMethod,products,totalPrice,user)=>{
      try{
       const order = new Order({
         name,
         email,
         phonenumber,
         address,
         city,
         country,
         paymentMethod,
         products,
         totalPrice,
         user
       })
       return await order.save();
      }catch(error){
        console.log(error);
        throw new Error("An error occurred while saving the order: " + error.message);
      }
}

export const findOrderById= async(user)=>{
    try{
        const order = await Order.find({user});
        return order;
    }catch(error){
        console.log(error);
        throw new Error("An error occurred while retrieving the order"+ error)
    }

}