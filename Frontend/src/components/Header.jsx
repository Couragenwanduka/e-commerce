import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const options = [
    { value: 'myaccount', label: 'My Account', image: 'person.png', path: '/UserDisplay' },
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
        setDropdownVisible(!dropdownVisible);
    };

    const handleOptionSelect1 = () => {
        setDropdown(!dropdown);
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response= await axios.post('https://e-commerce-wr0e.onrender.com/searchProducts',{
                name:searchInput
            })
            onSearchResults(response.data.products);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-800 items-center py-4 px-4 md:py-0 md:px-10">
            <div className="flex items-center justify-between w-full md:w-auto">
                <h1 className="text-2xl font-mono text-white">MarketMate</h1>
                <button onClick={handleOptionSelect} className="text-white md:hidden">My Account ^</button>
            </div>
            {dropdownVisible && (
                <ul className='dropdown-menu'>
                    {options.map(option => (
                        <li key={option.value} className="dropdown-item">
                            {option.path ? (
                                <Link to={option.path}>
                                    <img src={option.image} alt={option.label} className="mr-2 w-6 h-6" />
                                    {option.label}
                                </Link>
                            ) : (
                                <>
                                    <img src={option.image} alt={option.label} className="mr-2 w-6 h-6" />
                                    {option.label}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto mt-4 md:mt-0">
                <form className="relative mb-4 md:mb-0" onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full md:w-96 h-10 pl-2 pr-10 rounded-lg focus:outline-none border border-gray-300" 
                        onChange={handleSearchInputChange}
                    />
                    <button className="absolute right-2 top-0 h-full bg-white text-blue-800 px-4 rounded-r-lg border border-gray-300">Search</button>
                </form>
                <div className="flex items-center space-x-4 md:space-x-8">
                    <button onClick={handleOptionSelect1} className="text-white flex items-center md:hidden">
                        <img src="help.png" alt="help" className="mr-2 w-6 h-6"/>
                        HELP
                    </button>
                    <Link to={'/cart'} className="hidden md:flex items-center text-white">
                        <img src="cart.png" alt="cart" className="w-6 h-6" />
                        <span className="ml-2">Cart</span>
                    </Link>
                </div>
            </div>
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
    );
}

export default Header;
