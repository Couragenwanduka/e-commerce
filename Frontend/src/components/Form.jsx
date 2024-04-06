import React, { useState } from 'react';


import axios from 'axios'; 

function FORM(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your API endpoint using async/await
            const response = await axios.post('http://localhost:5740/register', {
                name: name,
                email: email,
                password: password
            });

            // Handle success response
            console.log('Registration successful:', response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage(response.data.error)
            setTimeout(()=>{
                window.location.href='/sign-in';
            },2000)
        } catch (error) {
            // Handle error
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="shadow-md shadow-black bg-zinc-500 p-8">
            <h1 className="mt-10 text-xl antialiased font-bold text-gray-800 ml-20">Register</h1>
            <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
                <label className="ml-96 w-80 border-black">NAME</label>
                <input
                    type={'text'}
                    placeholder="Enter your name"
                    className="ml-96 w-80 border-gray-500 p-3 rounded border-2"
                    value={name}
                    onChange={handleNameChange}
                />
                <label className="ml-96 w-80 border-black">EMAIL</label>
                <input
                    type={'email'}
                    placeholder="Enter your email"
                    className="ml-96 w-80 border-gray-500 p-3 rounded border-2"
                    value={email}
                    onChange={handleEmailChange}
                />
                <label className="ml-96 w-80 border-black">Password</label>
                <input
                    type={'password'}
                    placeholder="Enter your password"
                    className="ml-96 w-80 border-gray-500 p-3 rounded border-2"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit" className="p-4 mt-3 bg-amber-500 w-32 ml-96">Submit</button>
                {successMessage&&<div className="ml-96 text-green-600">{successMessage}</div>}
                {errorMessage&&<div className="ml-96 text-green-600">{errorMessage}</div>}
                <p>if you have an account <a> Click to Login</a></p>
            </form>
        </div>
    );
}

export default FORM;
