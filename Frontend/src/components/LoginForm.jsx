import axios from 'axios'
import { useState } from 'react';


function LOGINFORM(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
         const response= await axios.post('http://localhost:5740/login',{
            email,
            password
         })
         setTimeout(()=>{
            if(response.data.user.role== 'admin'){
                window.location.href='/sign-up'
            }else{
                window.location.href='/Loggedin'
            }
         })
        }catch(error){

        }
    }
    return(
        <div className="shadow-md shadow-black bg-zinc-500 p-8">
            <h1 className="mt-10 text-xl antialiased font-bold text-gray-800 ml-20">LOGIN</h1>
            <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
                <label className="ml-96 w-80 border-black">EMAIL</label>
                <input type={"email"} placeholder="Enter your email" 
                className="ml-96 w-80 border-gray-500 p-3 rounded border-2" 
                value={email}
                onChange={handleEmailChange}
                />
                <label className="ml-96 w-80 border-black">Password</label>
                <input type={"password"} 
                placeholder="Enter your password" 
                className="ml-96 w-80 border-gray-500 p-3 rounded border-2"
                value={password}
                onChange={handlePasswordChange}
                />
                <button type="submit" className="p-4 mt-3 bg-amber-500 w-32 ml-96">Submit</button>
                <p>if you don't have an account <a> Click to Register</a></p>
                {successMessage&&<div className="ml-96 text-green-600">{successMessage}</div>}
                {errorMessage&&<div className="ml-96 text-green-600">{errorMessage}</div>}
            </form>
        </div>
    )
}

export default LOGINFORM;