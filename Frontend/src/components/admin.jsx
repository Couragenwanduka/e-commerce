import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the components for each page
// import SellersPage from './SellersPage';
// import OrdersPage from './OrdersPage';
// import ProductsPage from './ProductsPage';

const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`w-64 bg-gray-800 text-white ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <button className="text-white" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <ul>
                        <li>
                            <Link to="/admin/sellers" className="block py-2 px-4 hover:bg-gray-700">Sellers</Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                        </li>
                        <li>
                            <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Your LOGO component can go here */}
                {/* <LOGO /> */}
            </div>
        </div>
    );
}

export default AdminPage;
