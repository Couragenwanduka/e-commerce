import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const options = [
    { value: 'myaccount', label: 'My Account', image: 'person.png' },
    { value: 'Order', label: 'Order', image: 'Order.png' },
    { value: 'mail', label: 'Mail', image: 'inbox.png' },
    { value: 'saved', label: 'Saved Items', image: 'saved.png' },
    { value: 'logout', label: 'LOG OUT' }
];

const helpOptions = [
    { value: 'Help Center', label: 'Help Center'},
    { value: 'place an Order', label: 'Place an Order'},
    { value: 'Payment Option', label: 'Payment Option'},
    { value: 'Track Your Order', label: 'Track Your Order'},
    { value: 'Cancel Your Order', label: 'Cancel Your Order'}
];

function Header({ onSearchResults }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleOptionSelect = () => {
        setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
    };

    const handleOptionSelect1 = () => {
        setDropdown(!dropdown); // Toggle dropdown visibility
    };

    const user = "Hi, Courage";
    
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response= await axios.post('http://localhost:5740/searchProducts',{
                name:searchInput
            })
            onSearchResults(response.data.products);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="flex bg-blue-800 h-24 items-center">
            <h1 className="flex-1 ml-4 text-2xl font-mono text-white">MarketMate</h1>
            <div className="flex items-center justify-end mr-56">
                <form className="relative" onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-96 h-10 pl-2 pr-10 rounded-lg focus:outline-none border border-gray-300" 
                        onChange={handleSearchInputChange}
                    />
                    <button className="absolute right-2 top-0 h-full bg-white text-blue-800 px-4 rounded-r-lg border border-gray-300">Search</button>
                </form>
            </div>
            <div className="relative mr-20">
                <button onClick={handleOptionSelect} className="text-white">{user} ^</button>
                {dropdownVisible && (
                    <ul className='dropdown-menu'>
                        {options.map(option => (
                            <li key={option.value} className="dropdown-item">
                                <img src={option.image} alt={option.label} className="mr-2 w-6 h-6" />
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='relative mr-20'>
                <button onClick={handleOptionSelect1} className="text-white flex items-center">
                    <img src="help.png" alt="help" className="mr-2 w-6 h-6"/>
                    HELP
                </button>
                {dropdown && (
                    <ul className='dropdown-menu'>
                        {helpOptions.map(option => (
                            <li key={option.value} className="dropdown-item">
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mr-10">
                <Link to={'/order'}>
                    <img src="cart.png" alt="cart" className="w-6 h-6 text-white"/>
                    <button className="text-white">Cart</button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
