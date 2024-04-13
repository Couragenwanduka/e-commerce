import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal'
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
const EmailForm= ()=>{
    const[email,setEmail]=useState('');
    const [successMessage, setSuccessMessage]=useState('');
    const [errorMessage, setErrorMessage]=useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [modalIsOpen,setIsOpen] = useState(false);

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
         setIsOpen(true);
         // Assuming the token is returned in the response
         const token = response.data.token;
    
         // Set the 'token' cookie with the value of the token variable
         setCookie('token', token, { path: '/' });
        
         
         
            if(response.status === 200){
                window.location.href='/otp-verification'
            }
         
        }catch(error){
            setErrorMessage(response.data.error);
            setIsOpen(true);
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
                <button className="ml-64 mt-4 px-6 py-3 rounded border-2 bg-red-800 text-black font-semibold shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">Submit</button>


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
    )
}

export default EmailForm;
