import {Link} from 'react-router-dom';
function LANDINGHeader() {
    const [searchInput, setSearchInput] = useState('');
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
        <div className="flex bg-blue-800 h-24">
            <h1 className="flex-1 w-14 ml-4 text-3xl font-mono">MarketMate</h1>
            <form className="relative mb-4 md:mb-0" onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full md:w-96 h-10 pl-2 pr-10 rounded-lg focus:outline-none border border-gray-300" 
                        onChange={handleSearchInputChange}
                    />
                    <button className="absolute right-2 top-0 h-full bg-white text-blue-800 px-4 rounded-r-lg border border-gray-300">Search</button>
                </form>
            <Link to={'/sign-up'}>
            <button className="flex-1 w-32 rounded shadow-gray-600  h-10 mt-8 ml-2" id='button'>Sign Up</button>
            </Link>
            <Link to={'/sign-in'}>
            <button className="flex-1 w-32 rounded shadow-gray-600  h-10 mt-8 ml-2" id='button'>sign-in</button>
            </Link>
            
        </div>
    );
}

export default LANDINGHeader;
