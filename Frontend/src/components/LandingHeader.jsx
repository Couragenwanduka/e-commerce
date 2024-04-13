import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LANDINGHeader() {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5740/searchProducts', {
                name: searchInput
            });
            // Handle the response here
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-between bg-blue-800 h-24 p-4">
            <h1 className="text-3xl font-mono text-white">MarketMate</h1>
            <form className="relative" onSubmit={handleOnSubmit}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full md:w-96 h-10 pl-2 pr-10 rounded-lg focus:outline-none border border-gray-300" 
                    onChange={handleSearchInputChange}
                />
                <button className="absolute right-2 top-0 h-full bg-white text-blue-800 px-4 rounded-r-lg border border-gray-300">Search</button>
            </form>
            <div className="flex space-x-4">
                <Link to="/sign-up">
                    <button className="w-32 h-10 rounded shadow-md bg-gray-600 text-white">Sign Up</button>
                </Link>
                <Link to="/sign-in">
                    <button className="w-32 h-10 rounded shadow-md bg-gray-600 text-white">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default LANDINGHeader;
