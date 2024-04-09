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
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        phone: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform checkout logic here, using formData
            console.log(formData);
            setIsOpen(false); // Close the modal after checkout
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <>
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold my-4">Orders</h2>
            {products.map((product, index) => (
                <div key={index} className="product-container">
                    <div className='product-card'>
                        <p className="product-price">Product: {product.product}</p>
                        <p className="product-name">Price: {product.price}</p>
                        <p className="product-price">Quantity: {product.quantity}</p>
                        {product.imageUrl && product.imageUrl.map((url, i) => (
                            <img key={i} src={url} alt={`Image ${i}`} className="product-image" />
                        ))}
                    
                    </div>
                </div>
            ))}
            {/* Display success or error messages if any */}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>

        <button className="checkoutbutton" onClick={() => setIsOpen(true)}>Continue to Checkout</button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
        >
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" className="input" />
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="input" />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="input">
                        <option value="credit card">Credit Card</option>
                        <option value="debit card">Debit Card</option>
                        <option value="paypal">Paypal</option>
                        <option value="payment on delivery">Payment on Delivery</option>
                    </select>
                </div>
                <div className="flex justify-between mt-6">
                    <button type="submit" className="checkoutbutton">Place Order</button>
                    <button type="button" className="checkoutbutton" onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </form>
        </Modal>
        </>
    );
};

export default OrderPage;
