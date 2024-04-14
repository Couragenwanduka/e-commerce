import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';
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
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

function LOGINFORM(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalIsOpen,setIsOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [choices, setChoices]= useState(false);
    const [asUser, setAsUser] = useState(false);
    const [asSeller, setAsSeller] = useState(false);
    const navigate = useNavigate();

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
        
         setSuccessMessage(response.data.message);
         setErrorMessage(response.data.message);
         setIsOpen(true);
         const token = response.data.token;
    
         // Set the 'token' cookie with the value of the token variable
         setCookie('token', token, { path: '/' });
        
         
            if(response.data.role == 'seller&user'){
                 setChoices(true)
            }if(asUser){
                // window.location.href='/Loggedin'
                navigate('/product');
            }else if(asSeller){
                window.location.href='/product'
            }else if(response.data.user.role== 'admin'){
                window.location.href='/admin'
            }else{
                window.location.href='/Loggedin'
            }
        
        }catch(error){
         setErrorMessage(error.response.data.message)
         setIsOpen(true);
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
            <Modal
    isOpen={choices}
    onRequestClose={() => setChoices(false)}
    style={customStyles}
    contentLabel="Choice Modal"
    ariaHideApp={false}
>
    <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Login as a User or Seller</h1>
        <button
            onClick={() => {
                setAsUser(true);
                setChoices(false);
                handleSubmit();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-4"
        >
            User
        </button>
        <button
            onClick={() => {
                setAsSeller(true);
                setChoices(false);
                handleSubmit();
            }}
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
        >
            Seller
        </button>
    </div>
</Modal>

            <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            >
                <div>
                <button onClick={() => setIsOpen(false)} className="bg-black text-base text-black font-medium">close</button>
                    {successMessage && <div className="text-black text-5xl font-sans font-medium">{successMessage}</div>}
                    {errorMessage && <div className="text-black text-5xl font-sans font-medium">{errorMessage}</div>}
                </div>
            </Modal>
        </div>
    )
}

export default LOGINFORM;