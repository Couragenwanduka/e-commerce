import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const REGISTERSELLER = () => {
const [name, setName]=useState('')
const [password, setPassword]=useState('')
const [companyName, setcompanyName]=useState('')
const [companyAddress, setCompanyAddress]=useState('')
const [cookies]= useCookies(['token'])
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();

const handleNameChange=(e) => {
    setName(e.target.value)
}

const handlePasswordChange=(e) => {
    setPassword(e.target.value)
}

const handleCompanyNameChange=(e) => {
    setcompanyName(e.target.value)
}

const handleCompanyAddressChange=(e) => {
    setCompanyAddress(e.target.value)
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const token = cookies.token;
        const response= await axios.post('https://e-commerce-wr0e.onrender.com/registerSeller',{
            name,
            password,
            companyName,
            companyAddress
        },
    {
        headers:{
            Authorization:`Bearer ${token}`
        },
        withCredentials:true
    })
    setSuccessMessage(response.data.message)
    setErrorMessage(error.response.data.message)
    
        setTimeout(()=>{
           if(response.status==200){
            navigate('/sign-in');
           }
        },2000)
    }catch(error){
        setErrorMessage(error.response.data.message)
    }
}

    return (
        <div className="flex items-center justify-center">
            <div>
                <img src="/User-Account-Sign-up.png" alt="User Account Sign-up" />
            </div>
            <form className="flex flex-col ml-8" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-8" id='logotext'>Register Seller</h1>
                <input type="text" placeholder="Name" className="w-80 border-gray-500 p-3 rounded border-2 mb-4"
                onChange={handleNameChange}
                />
                <input type="password" placeholder="Password" className="w-80 border-gray-500 p-3 rounded border-2 mb-4"
                onChange={handlePasswordChange}
                />
                <input type="text" placeholder="CompanyName" className="w-80 border-gray-500 p-3 rounded border-2 mb-4" 
                onChange={handleCompanyNameChange}
                />
                <input type="text" placeholder="CompanyAddress" className="w-80 border-gray-500 p-3 rounded border-2 mb-4" 
                onChange={handleCompanyAddressChange}
                />
                <div className="flex justify-between">
                    <button className="ml-64 mt-4 px-6 py-3 rounded border-2 bg-red-800 text-black font-semibold shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
                   
                </div>
                {successMessage && <div className="ml-64 text-black">{successMessage}</div>}
                {errorMessage && <div className="ml-96 text-black">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default REGISTERSELLER;
