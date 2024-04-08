import React, { useState } from 'react';
import Modal from 'react-modal'
import axios from 'axios'; 
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
        width: '400px',
        maxWidth: '90%',
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
           
            setSuccessMessage(response.data.message);
            setErrorMessage(response.data.error)
            setIsOpen(true);
            setTimeout(()=>{
                window.location.href='/sign-in';
            },2000)
        } catch (error) {
            setIsOpen(true);
        setErrorMessage(error.response.data.message)
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
                <p>if you have an account <a> Click to Login</a></p>
            </form>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal">
                <div>
                <button onClick={() => setIsOpen(false)} className="bg-black text-base text-white font-medium">close</button>
                    {successMessage && <div className="text-black text-5xl font-sans font-medium">{successMessage}</div>}
                    {errorMessage && <div className="text-black text-5xl font-sans font-medium">{errorMessage}</div>}
                </div>
            </Modal>
        </div>
    );
}

export default FORM;
