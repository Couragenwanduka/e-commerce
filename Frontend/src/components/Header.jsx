import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const options = [
    { value: 'myaccount', label: 'My Account', image: 'person.png' },
    { value: 'Order', label: 'Order', image: 'Order.png' },
    { value: 'mail', label: 'Mail', image: 'inbox.png' },
    { value: 'saved', label: 'Saved Items', image: 'saved.png' },
    { value: 'logout', label: 'LOG OUT' }
];
const helpOptions = [
    { value: 'Help Center', label: 'Help Center'},
    { value: 'place an Order', label: 'place an Order'},
    { value: 'Payment Option', label: 'Payment Option'},
    { value: 'Track Your Order', label: 'Track Your Order'},
    { value: 'Cancel Your Order', label: 'Cancel Your Order'}
];

function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleOptionSelect = () => {
        setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
    };
    const handleOptionSelect1 = () => {
        setDropdown(!dropdown); // Toggle dropdown visibility
    };
    const user = "Hi , courage";
    
    return (
       <div className="flex bg-blue-800 h-24 items-center">
            <h1 className="flex-1 ml-4 text-2xl font-mono text-white">MarketMate</h1>
            <input type="text" placeholder="Search..." className="flex-auto w-1/3 h-10 mt-2 rounded-l-lg p-2 focus:outline-none" />
            <button className="rounded-r-lg bg-white text-blue-800 h-10 mt-2 mr-2">Search</button>
            <div className="relative mr-4">
                <button onClick={handleOptionSelect} className="text-white">{user} ^</button>
                {dropdownVisible && (
                    <ul className='absolute top-10 right-0 bg-white rounded-lg shadow-lg p-2'>
                        {options.map(option => (
                            <li key={option.value}>
                                <img src={option.image} alt={option.label} className="mr-2 w-6 h-6" />
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='relative mr-4'>
                <button onClick={handleOptionSelect1} className="text-white flex items-center">
                    <img src="help.png" alt="help" className="mr-2 w-6 h-6"/>
                    HELP
                </button>
                {dropdown && (
                    <ul className='absolute top-10 right-0 bg-white rounded-lg shadow-lg p-2'>
                        {helpOptions.map(option => (
                            <li key={option.value}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mr-4">
                <Link to={'/order'}>
                <img src="cart.png" alt="cart" className="w-6 h-6 text-white"/>
                <button className="text-white">Cart</button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
