import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const EmailForm= ()=>{
    const[email,setEmail]=useState('');
    const [successMessage, setSuccessMessage]=useState('');
    const [errorMessage, setErrorMessage]=useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleEmailChange=(e)=>{
       setEmail(e.target.value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
         const response= await axios.post('http://localhost:5740/validateEmail',{
            email
         })
        
         setSuccessMessage(response.data.message);
         setErrorMessage(response.data.error);
         
         // Assuming the token is returned in the response
         const token = response.data.token;
    
         // Set the 'token' cookie with the value of the token variable
         setCookie('token', token, { path: '/' });
        
         
         setTimeout(()=>{
            if(response.status === 200){
                window.location.href='/otp-verification'
            }
         },5000)
        }catch(error){
            console.log(error)
        }
    }
    
    return(
        <div className="flex">
            <div>
                <img src="../public/Flea-market.png" className="w-100" />
            </div>
            <form className="" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="ml-64 mt-56 w-6/12 border-gray-500 p-3 rounded border-2"
                    onChange={handleEmailChange}
                />
                <button className="ml-96 mt-4 w-30  p-3 rounded border-2 bg-red-800 text-white">Submit</button>
                {successMessage && <div className="ml-64 text-black">{successMessage}</div>}
                {errorMessage && <div className="ml-96 text-black">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default EmailForm;
