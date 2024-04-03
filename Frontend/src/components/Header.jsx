import React, { useState } from 'react';

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
]

function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleOptionSelect = () => {
        setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
    };
    const handleOptionSelect1 = () => {
        setDropdown(!dropdown); // Toggle dropdown visibility
    };
    const user= "Hi , courage"
    return (
        <div className="flex bg-blue-800 h-24">
            <h1 className="flex-1 w-14 ml-4 text-3xl font-mono">MarketMate</h1>
            <input type="text" placeholder="Search Products, Brands, and Categories" className="flex-auto w-50 h-20 mt-2 bOrder-black" />
            <button className="flex-1 w-32 rounded shadow-gray-600  h-10 mt-8 ml-2" id='button'>Search</button>
            <div className="flex-1 " onClick={handleOptionSelect} id='dropdown'>
                <span>{user} ^</span>
                {dropdownVisible && (
                    <ul className='list-none'>
                        {options.map(option => (
                            <li key={option.value} style={{position:'relative'}}>
                                <img src={option.image} alt={option.label} style={{ marginRight: '10px', width: '24px', height: '24px',position:'relative' }} />
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='flex-1' onClick={handleOptionSelect1} id='dropdown1' >
            <span className='flex'>
            <img src="help.png" alt="help" id='imagelogo'/>
            <h1 className="flex-1" id='logotext'>HELP</h1>
            </span>
            {dropdown && (
                <ul className='list-none'>
                    {helpOptions.map(option => (
                        <li key={option.value} style={{position:'relative'}}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <img src="cart.png" alt="cart" id='imagelogo'/>
            <h1 className="flex-1" id='logotext'>Cart</h1>
        </div>
    );
}

export default Header;
