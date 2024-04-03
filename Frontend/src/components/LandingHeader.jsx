
function Header() {
    
    return (
        <div className="flex bg-blue-800 h-24">
            <h1 className="flex-1 w-14 ml-4 text-3xl font-mono">MarketMate</h1>
            <input type="text" placeholder="Search Products, Brands, and Categories" className="flex-auto w-50 h-20 mt-2 bOrder-black" />
            <button className="flex-1 w-32 rounded shadow-gray-600  h-10 mt-8 ml-2" id='button'>Search</button>
           
        </div>
    );
}

export default Header;
