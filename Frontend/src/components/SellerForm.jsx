import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
const REGISTERSELLER = () => {
const [name, setName]=useState('')
const [password, setPassword]=useState('')
const [companyName, setcompanyName]=useState('')
const [companyAddress, setCompanyAddress]=useState('')
const [cookies]= useCookies(['token'])
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

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
        const response= await axios.post('http://localhost:5740/registerSeller',{
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
    console.log(response.status)
        setTimeout(()=>{
            setSuccessMessage(response.data.message)
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                   
                </div>
            </form>
        </div>
    )
}

export default REGISTERSELLER;
