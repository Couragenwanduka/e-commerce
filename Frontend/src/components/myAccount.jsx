import axios from "axios";
import { useCookies } from 'react-cookie';
import { useState } from "react";

const UserDisplayPage = () => {
    const [cookies] = useCookies(['token']); // Retrieve the token from cookies
    const [user, setUser]= useState([]);
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
    };

    const handleLeave = (event) => {
        event.target.style.backgroundColor = 'white'; // Restore original background when leaving
    };
    const handleClick = async(event) => {
        const token= cookies.token;
       event.preventDefault();
       const response = await axios.get('http://localhost:5740/getUserInfo',{
        headers: {
            Authorization: `Bearer ${token}` // Add the token to the request headers
        },
        withCredentials: true, // Include cookies in the request
       })
       const userData = response.data; // Assuming response.data is user data
    setUser(Array.isArray(userData) ? userData : [userData]);
    console.log(userData.user._id);
    };

    return (
        <>
            <aside style={containerStyle}>
                <div style={sectionStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                    <h1>My Profile</h1>
                    <ul>
                        <li onClick={handleClick}>Account Information</li>
                        <li>Delivery Address</li>
                    </ul>
                </div>
                <div style={sectionStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                    <h1>My Orders</h1>
                    <ul>
                        <li>Order History</li>
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

            <div className=" display">
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
        </>
    );
};

export default UserDisplayPage;
