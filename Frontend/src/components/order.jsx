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

    return (
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
    );
};

export default OrderPage;
