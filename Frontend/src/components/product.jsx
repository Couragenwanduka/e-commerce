import { useState } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie'
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
const PRODUCTPAGE = () => {
    const [name, setName] = useState('');
    const [Category , setCategory] = useState('');
    const [Description, setDescription] = useState('');
    const [stock , setStock] = useState('');
    const [price , setPrice] = useState('');
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies] = useCookies(['token']); 
    const [modalIsOpen,setIsOpen] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleStockChange = (e) => {
        setStock(e.target.value);
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }
    const handleImageChange = (e) => {
        setImage(e.target.value);
    }
    const handleImage2Change = (e) => {
        setImage2(e.target.value);
    }
    const handleImage3Change = (e) => {
        setImage3(e.target.value);
    }
    const handleImage4Change = (e) => {
        setImage4(e.target.value);
    }
    const handleImage5Change = (e) => {
        setImage5(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data={
           
            Category,
            name,
            Description,
            stock,
            price,
            image,
            image2,
            image3,
            image4,
            image5
        }
       try{
        const token = cookies.token;
        const response= await axios.post('http://localhost:5740/uploadProducts',data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSuccessMessage(response.data.message);
        setErrorMessage(response.data.error);
        setIsOpen(true);
       }catch(error){
        setErrorMessage(error.response.data.message)
        setIsOpen(true);
       }
    }

    return (
        <>
        <form className="flex flex-col w-full ml-10 space-y-4" onSubmit={handleSubmit}>
            <label className="text-lg font-semibold text-gray-800">Category</label>
            <input type="text" placeholder="Enter the Category" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleCategoryChange}
            />

            <label className="text-lg font-semibold text-gray-800">Name</label>
            <input type="text" placeholder="Enter the Name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleNameChange}
            />

            <label className="text-lg font-semibold text-gray-800">Description</label>
            <textarea placeholder="Enter the Description" rows="5" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleDescriptionChange}
            />

            <label className="text-lg font-semibold text-gray-800">Stock</label>
            <input type="text" placeholder="Enter the Stock" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleStockChange}
            />

            <label className="text-lg font-semibold text-gray-800">Price</label>
            <input type="text" placeholder="Enter the Price" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handlePriceChange}
            />

            <label className="text-lg font-semibold text-gray-800">Images</label>
            <input type="file" placeholder="Enter the Image" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleImageChange}
            />
            <input type="file" placeholder="Enter the Image" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleImage2Change}
            />
            <input type="file" placeholder="Enter the Image" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleImage3Change}
            />
            <input type="file" placeholder="Enter the Image" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleImage4Change}
            />
            <input type="file" placeholder="Enter the Image" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={handleImage5Change}
            />

            <button className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Submit</button>
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
            </>
    );
}

export default PRODUCTPAGE;
