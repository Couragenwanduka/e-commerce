import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f4f4f4',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

function FORM(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalIsOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
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
            const response = await axios.post('https://e-commerce-wr0e.onrender.com/register', {
                name: name,
                email: email,
                password: password
            });

            setSuccessMessage(response.data.message);
            setIsOpen(true);
            if(response.status === 200){
                navigate('/sign-in');
            }
               
        } catch (error) {
            setIsOpen(true);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div className="shadow-md bg-zinc-500 p-8 md:p-10">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-8 md:mb-10">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                    <label htmlFor="name" className="text-sm">NAME</label>
                    <input
                        id="name"
                        type={'text'}
                        placeholder="Enter your name"
                        className="w-full border border-gray-500 p-3 rounded"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="email" className="text-sm">EMAIL</label>
                    <input
                        id="email"
                        type={'email'}
                        placeholder="Enter your email"
                        className="w-full border border-gray-500 p-3 rounded"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input
                        id="password"
                        type={'password'}
                        placeholder="Enter your password"
                        className="w-full border border-gray-500 p-3 rounded"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="p-4 bg-amber-500 w-full rounded text-white">Submit</button>
            </form>
            <p className="text-center mt-4">if you have an account <a href="/sign-in" className="text-blue-500">Click to Login</a></p>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>
                    <button onClick={() => setIsOpen(false)} className="bg-black text-base text-white font-medium">Close</button>
                    {successMessage && <div className="text-black text-5xl font-sans font-medium">{successMessage}</div>}
                    {errorMessage && <div className="text-black text-5xl font-sans font-medium">{errorMessage}</div>}
                </div>
            </Modal>
        </div>
    );
}

export default FORM;
