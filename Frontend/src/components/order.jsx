import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';

const OrderPage = () => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies] = useCookies(['token']); // Retrieve the token from cookies
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        phonenumber:'',
        address: '',
        city: '',
        country: '',
        paymentMethod: 'credit card',
    });
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = cookies.token;
                const response = await axios.get('http://localhost:5740/showorder', {
                    headers: {
                        Authorization: `Bearer ${token}` // Add the token to the request headers
                    },
                    withCredentials: true, // Include cookies in the request
                });
                const cartArray = Array.isArray(response.data.cart) ? response.data.cart : [response.data.cart];
        
                setProducts(cartArray);
                setSuccessMessage(response.data.message);
            } catch (error) {
                setErrorMessage('Error fetching orders');
                console.error('Error fetching orders:', error);
            }
        };
     
        fetchData();
    }, [cookies.token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateSubtotal = () => {
        let subtotal = 0;
        // Calculate subtotal based on products, excluding products with quantity 0
        products.forEach((product) => {
            if (product.quantity > 0) {
                subtotal += product.price * product.quantity;
            }
        });
        return subtotal;
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        const subtotal = calculateSubtotal();
        return parseInt(subtotal).toLocaleString();
    };

    const totalPrice = calculateTotalPrice();
    
    const removeFromCart= async (product) => {
        try{
         const response = await axios.delete(`http://localhost:5740/deleteorder/${product._id}`)
         if(response.status==200){
            window.location.reload();
         }
         setSuccessMessage(response.data.message)
         setErrorMessage(response.data.error)
        }catch(error){
           setErrorMessage(error.message)
        }

    };
    const checkout= async(e)=>{
        e.preventDefault();
        try{
            const token = cookies.token;
            const response = await axios.post('http://localhost:5740/saveorder', {formData, products,totalPrice},{
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                },
                withCredentials: true, // Include cookies in the request
            });
            setSuccessMessage(response.data.message)
            setErrorMessage(response.data.error)
           if(response.status==200 ){
            window.location.reload();
           }
           
        }catch(error){
            setErrorMessage(error.response.data.message)
        }
    }
    return (
        <>
   <div className="container mx-auto bg-gray-300 rounded-lg p-8 shadow-md">
    <h2 className="text-3xl font-bold mb-8">Cart Items</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-gray-800 font-semibold">{product.product}</div>
                <div className="text-gray-600">Name: {(product.name)}</div>
                <div className="text-gray-600">Price: ${parseInt(product.price).toLocaleString()}</div>
                <div className="text-gray-600">Quantity: {product.quantity}</div>
                {product.imageUrl && (
                    <img src={product.imageUrl[0]} alt={`Image`} className="mt-4 w-full h-auto" />
                )}
                <button className="mt-4 bg-red-500 hover:bg-red-900 text-black py-2 px-4 rounded" onClick={() => removeFromCart(product)}>Remove from Cart</button>
            </div>
        ))}
         <div className="border-t mt-8 pt-4 ">
                <div className="text-lg text-gray-800 font-semibold mb-2">
                    Total Price:
                </div>
                <div>
                    {products.map((product,index) =>(
                       <div key={index} className="table">
                       <div className="table-row">
                           <div className="table-cell">Name:</div>
                           <div className="table-cell">Price:</div>
                           <div className="table-cell">Quantity:</div>
                       </div>
                       <div className="table-row">
                           <div className="table-cell text-red-800">{product.name}</div>
                           <div className="table-cell text-red-950">${parseInt(product.price).toLocaleString()}</div>
                           <div className="table-cell text-gray-600">{product.quantity}</div>
                       </div>
                   </div>
                   
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-red-900">
                    <div>Subtotal:</div>
                    <div>${totalPrice}</div>
                </div>
            </div>
    </div>
    {/* Display success or error messages if any */}
    {successMessage && <div className="text-green-500 mt-8">{successMessage}</div>}
    {errorMessage && <div className="text-red-500 mt-8">{errorMessage}</div>}
</div>





        <button className="checkoutbutton" onClick={() => setIsOpen(true)}>Continue to Checkout</button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
        >
<form className="p-6">
<h2 className="text-xl font-semibold mb-4">Checkout</h2>
<div className="grid grid-cols-2 gap-4">
    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input" />
    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" />
    <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} placeholder="Phone Number" className="input" />
    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="input" />
    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="input">
        <option value="credit card" >Credit Card</option>
        <option value="debit card">Debit Card</option>
        <option value="paypal">Paypal</option>
        <option value="payment on delivery">Payment on Delivery</option>
    </select>
</div>
<div className="flex justify-between mt-6 mr-40">
    <button type="submit" className="checkoutbutton" onClick={checkout}>Place Order</button>
    <button type="button" className="checkoutbutton" onClick={() => setIsOpen(false)}>Cancel</button>
</div>
</form>
        </Modal>
        </>
    );
};

export default OrderPage;
