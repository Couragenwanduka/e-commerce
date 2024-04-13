import axios from "axios";
import { useCookies } from 'react-cookie';
import { useState } from "react";


const UserDisplayPage = () => {
    const [cookies] = useCookies(['token']); // Retrieve the token from cookies
    const [user, setUser]= useState([]);
    const [Order, setOrder]= useState([]); 
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: 'grey',
        padding: '20px',
        margin: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Reduced shadow
        borderRadius: '8px',
        backgroundColor: 'white',
        width: '250px', // Reduced width
        height: '400px', // Increased height
    };

    const sectionStyle = {
        textAlign: 'left', // Align to the left
        borderBottom: '1px solid #e0e0e0', // Subtle separation
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box', // Include padding and border in width calculation
        transition: 'background-color 0.3s ease', // Transition for hover effect
    };

    const handleHover = (event) => {
        event.target.style.backgroundColor = '#f0f0f0'; // Lighter background on hover
        event.target.style.cursor='pointer';
    };

    const handleLeave = (event) => {
        event.target.style.backgroundColor = 'white'; // Restore original background when leaving
    };
    const handleClick = async(event) => {
        const token= cookies.token;
       event.preventDefault();
       const response = await axios.get('https://e-commerce-wr0e.onrender.com/getUserInfo',{
        headers: {
            Authorization: `Bearer ${token}` // Add the token to the request headers
        },
        withCredentials: true, // Include cookies in the request
       })
       const userData = response.data; 
    setUser(Array.isArray(userData) ? userData : [userData]);
    
    };

    const showOrder= async(event)=>{
        try{
            const token= cookies.token;
           const response = await axios.get('https://e-commerce-wr0e.onrender.com/showorderdetails',{
            headers: {
                Authorization: `Bearer ${token}` // Add the token to the request headers
            },
            withCredentials: true, // Include cookies in the request
   
        })
        const OrderData = response.data; 
        setOrder(Array.isArray(OrderData) ? OrderData : [OrderData]);
        console.log(OrderData);
        }catch(error){
            console.log(error);
            throw new Error("An error occurred while retrieving the seller"+ error)
        }
    }
    const handlePageReload=()=>{
        // window.location.reload();
        showOrder();
    }

    return (
        <>
            <aside style={containerStyle}>
                <div style={sectionStyle} >
                    <h1>My Profile</h1>
                    <ul>
                        <li onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleLeave}>Account Information</li>
                        <li>Delivery Address</li>
                    </ul>
                </div>
                <div style={sectionStyle}>
                    <h1>My Orders</h1>
                    <ul>
                        <li onMouseEnter={handleHover} onMouseLeave={handleLeave} onClick={handlePageReload}>Order History</li>
                        <li>Track My Order</li>
                    </ul>
                </div>
                <div style={sectionStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                    <h1>Delete Account</h1>
                    <ul>
                        <li>Delete Account</li>
                    </ul>
                </div>
            </aside>

            <div>
                <div id="display">
                {user && user.map((userData, index) => (
                    <div key={index}>
                        <h2 className="user-name">Name:{userData.user.name}</h2>
                        <p className="user-email">Email:{userData.user.email}</p>
                        <input type="text" placeholder="Enter Password" className="input-box"/>
                        <input type="text" placeholder="Confirm Password" className="input-box"/>
                        <button className="submitbtn">Submit</button>
                    </div>
                ))}
                </div>
            </div>
            
            <div>
    {Order && Order.map((orderData, index) => (
        <div key={index} class="order-container">
            {/* Display order ID */}
            <h2 class="order-id">ORDER ID: {orderData._id}</h2>
            {/* Iterate over products within the order */}
            {orderData.product.map((product, productIndex) => (
                <div key={productIndex} class="product">
                    {/* Display product details */}
                    <h3 class="product-name">Product {productIndex + 1}</h3>
                    <p class="product-info"><strong>Name:</strong> {product.name}</p>
                    <p class="product-info"><strong>Category:</strong> {product.category}</p>
                    <p class="product-info product-description"><strong>Description:</strong> {product.description}</p>
                    <p class="product-info"><img class="product-image" src={product.imageUrl} alt={product.name} /></p>
                    <p class="product-info"><strong>Price:</strong> {product.price}</p>
                </div>
            ))}
            {/* Submit button */}
            <button class="submit-button">Submit</button>
        </div>
    ))}
</div>
    


        </>
    );
};

export default UserDisplayPage;
