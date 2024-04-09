import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [seller, setSeller] = useState([]);
    const [_id, setId] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [messageModel, setMessageModel] = useState(false);
    const [modal, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModalOpen] = useState(false);
    const [deleteUserModal, setDeleteUserModalOpen] = useState(false)
    const [sellerModal, setSellerModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [cookies] = useCookies(['token']);

    const fetchData = async () => {
        try {
            const token = cookies.token;
            const response = await axios.get('http://localhost:5740/getallusers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 
            setUsers(response.data); 
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage(error.response.data.message); 
        }
    };
    
    const fetchSellers= async()=>{
        try{
            const token = cookies.token;
            const response= await axios.get('http://localhost:5740/getallsellers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSeller(response.data);
            setLoading(false);
        }catch(error){
            console.error('Error fetching data:', error);
            setErrorMessage(error.response.data.message);
        }
    }

    const deleteSeller = async () => {
        try {
            const token = cookies.token;
            const response = await axios.delete(`http://localhost:5740/deleteseller/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setSeller(response.data);
            setSellerModalOpen(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage(error.response.data.message);
        }
    }
    
    const deleteUser = async () => {
        try {
            const token = cookies.token;
            const response = await axios.delete(`http://localhost:5740/deleteUser/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setUsers(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
        fetchSellers(); // Fetch sellers when the component mounts
        deleteSeller(); // Delete the seller when the component mounts
        deleteUser(); // Delete the user when the component mounts
    }, [cookies.token]); 

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handlesellerModal = () => {
        setSellerModalOpen(true);
    }
    const handleDeleteSeller = () => {
        setDeleteModalOpen(true);
    }
    
    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
<ul>
    <li className="mb-4">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={()=>setDeleteUserModalOpen(true)}
        >Delete User</button>
    </li>
    <li className="mb-4">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleDeleteSeller}
        >Delete Seller</button>
    </li>
    <li className="mb-4">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Approve Product</button>
    </li>
    <li className="mb-4">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Delete Products</button>
    </li>
    <li className="mb-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handlesellerModal}
        >Get all Sellers</button>
    </li>
    <li>
        <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleOpen}
        >
            Get all Users
        </button>
    </li>
</ul>
                </div>
               
            </aside>
            <div><img src='../public/admin.jpg'/></div>
            <Modal
                isOpen={modal}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div>
                <h2>User Details</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                           
                           {Array.isArray(users.users) && users.users.map((user, index) => (
                        <div key={index} className="modal-container">
                            <button onClick={() => setIsModalOpen(false)} className="close-button">Close</button>
                            <div className='user-details'>
                                <h2 className='user-name'>{user.name}</h2>
                                <p className='user-email'>{user.email}</p>
                                <p className='user-phone'>{user._id}</p>
                            </div>
                        </div>
                    ))}


                        </>
                    )}
                </div>
            </Modal>
            <Modal 
            isOpen={sellerModal}
            onRequestClose={() => setSellerModalOpen(false)}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
            >
                <div>
                <h2>User Details</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                           
                           {Array.isArray(seller.users) && seller.users.map((user, index) => (
                        <div key={index} className="modal-container">
                            <button onClick={() => setSellerModalOpen(false)} className="close-button">Close</button>
                            <div className='user-details'>
                                <h2 className='user-name'>{user.name}</h2>
                                <p className='user-email'>{user.email}</p>
                                <p className='user-phone'>{user._id}</p>
                            </div>
                        </div>
                    ))}


                        </>
                    )}
                </div>

            </Modal>

            <Modal 
            isOpen={deleteModal}
            onRequestClose={() => setDeleteModalOpen(false)}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
            >
                <div className="modal-container">
                    <button onClick={() => setDeleteModalOpen(false)} className="close-button">Close</button>
                   <div className='flex flex-col'>
                    <label>Input Seller Id</label>
                    <input type="text" onChange={(e) => setId(e.target.value)} placeholder='ID' className='w-100 p-5'/>
                    <button onClick={() => deleteSeller()} className='mt-10 w-100 bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>Delete</button>
                   </div>
                </div>
            </Modal>
            <Modal 
            isOpen={deleteUserModal}
            onRequestClose={() => setDeleteUserModalOpen(false)}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
            >
                <div className="modal-container">
                    <button onClick={() => setDeleteUserModalOpen(false)} className="close-button">Close</button>
                   <div className='flex flex-col'>
                    <label>Input Seller Id</label>
                    <input type="text" onChange={(e) => setId(e.target.value)} placeholder='ID' className='w-100 p-5'/>
                    <button onClick={() => deleteUser()} className='mt-10 w-100 bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>Delete</button>
                   </div>
                </div>
            </Modal>
            <Modal
                isOpen={messageModel}
                onRequestClose={() => setMessageModel(false)}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div>
                    <h2>{successMessage ? 'Success' : 'Error'}</h2>
                    <p>{successMessage || errorMessage}</p>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;
