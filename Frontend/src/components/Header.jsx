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

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5740/searchProducts', {
                name: searchInput
            })
            onSearchResults(response.data.products);
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
    
   
        <div className="flex justify-between items-center bg-blue-800 text-white py-4 px-8" >
        <h1 className="text-2xl font-mono">MarketMate</h1>
          
            <form className="relative" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 h-10 pl-2 pr-10 rounded-lg focus:outline-none border border-gray-300"
                    onChange={handleSearchInputChange}
                />
                <button className="absolute right-0 top-0 h-full bg-white text-blue-800 px-4 rounded-r-lg border border-gray-300">Search</button>
            </form>
            <div className="flex items-center relative" >
                <button onClick={handleOptionSelect} className="ml-4" >My Account</button>
                {dropdownVisible && (
                    <ul className='dropdown-menu absolute bg-white mt-2 p-2 rounded border border-gray-300 text-black'>
                        {options.map(option => (
                            <li key={option.value} className="dropdown-item">
                                {option.path ? (
                                    <Link to={option.path}>
                                        <img src={option.image} alt={option.label} className="mr-2 w-6 h-6"  />
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
            </div>
            <div className="flex items-center space-x-4">
                {/* <button onClick={handleOptionSelect1} className="hidden md:block">HELP</button> */}
                <Link to={'/cart'} className="flex items-center">
                    <img src="cart.png" alt="cart" className="w-6 h-6" />
                    <span className="ml-2">Cart</span>
                </Link>
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
        </>
    );
}

export default Header;
