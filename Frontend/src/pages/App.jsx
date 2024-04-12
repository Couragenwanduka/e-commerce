import '../App.css'
import LOGO from '../components/Logo'
import HEADER from '../components/Header'
import FOOTER from '../components/Footer'
import CATEGORIES from '../components/Category'
import SHOWALLPRODUCTSExtra  from '../components/landingPageShowProduct';
import  { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (results) => {
    setSearchResults(results);
};
  return (
    <div>
      <LOGO/>
      <HEADER onSearchResults={handleSearchResults}/>
      < CATEGORIES/>
      <SHOWALLPRODUCTSExtra  products={searchResults} />
      <FOOTER />
      
    </div>
  )
}

export default App
