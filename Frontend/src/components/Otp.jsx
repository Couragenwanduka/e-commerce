import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const OTP = () => {
    const [otp, setOtp] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies] = useCookies(['token']); // Retrieve the token from cookies

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = cookies.token; // Get the token from cookies
            const response = await axios.post('https://e-commerce-wr0e.onrender.com/validateOtp', {
                otp,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                },
                withCredentials: true, // Include cookies in the request
            });

            setSuccessMessage(response.data.message);
            setErrorMessage(response.data.error);
            
                if (response.status === 200) {
                    window.location.href = '/seller-Registration';
                }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex">
            <div><img src="../public/Flea-market.png" className="w-100" /></div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Your OTP"
                    className="ml-64 mt-56 w-6/12 border-gray-500 p-3 rounded border-2"
                    onChange={handleOtpChange}
                />
               <button className="ml-64 mt-4 px-6 py-3 rounded border-2 bg-red-800 text-black font-semibold shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
               >Submit</button>
                {successMessage && <div className="ml-64 text-black">{successMessage}</div>}
                {errorMessage && <div className="ml-96 text-black">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default OTP;
